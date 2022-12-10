import axios, { AxiosInstance } from 'axios'
import { getTokenStorage, saveTokenStorage } from '@storages/token'

import { AppError } from '@utils/AppError'

type PromiseType = {
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}

type RegisterinterceptorTokenManagerProps = {
  onSignOut: () => void
  onRefreshToken: (newToken: string) => Promise<void>
}

type APIInstanceProps = AxiosInstance & {
  registerinterceptorTokenManager: (props: RegisterinterceptorTokenManagerProps) => () => void
}

const api = axios.create({ baseURL: process.env.BASE_URL }) as APIInstanceProps

let isRefreshing = false
let failedQueue = [] as PromiseType[]

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

api.registerinterceptorTokenManager = ({ onSignOut, onRefreshToken }) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    // eslint-disable-next-line sonarjs/cognitive-complexity
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === 'token.expired' ||
          requestError.response.data?.message === 'token.invalid'
        ) {
          const currToken = await getTokenStorage()
          if (!currToken) {
            onSignOut()
            return Promise.reject(requestError)
          }

          const originalRequest = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject })
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                return api(originalRequest)
              })
              .catch((err) => Promise.reject(err))
          }

          isRefreshing = true

          // eslint-disable-next-line no-async-promise-executor
          return new Promise(async (resolve, reject) => {
            try {
              const {
                data: { token },
              } = await api.post<{ token: string }>('/sessions/refresh-token', {
                token: currToken,
              })

              await saveTokenStorage(token)
              api.defaults.headers.common.Authorization = `Bearer ${token}`
              originalRequest.headers.Authorization = `Bearer ${token}`
              onRefreshToken(token)
              processQueue(null, token)

              resolve(originalRequest)
            } catch (err: any) {
              processQueue(err, null)
              onSignOut()
              reject(err)
            } finally {
              isRefreshing = false
            }
          })
        }
        onSignOut()
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      }
      return Promise.reject(requestError)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
