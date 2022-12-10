import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { User } from '@models/user'
import { getUserStorage, removeUserStorage, saveUserStorage } from '@storages/user'
import { getTokenStorage, removeTokenStorage, saveTokenStorage } from '@storages/token'

import { api } from '@services/api'

import { AuthContextProps, AuthProviderProps, SessionResponseProps } from './types'

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props

  const [user, setUser] = useState<User | null>(null)
  const [loadingStorage, setLoadingStorage] = useState(true)
  const [refreshedToken, setRefreshedToken] = useState('')

  const updateUserSessionData = useCallback(
    (userData: User, token: string) => {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setUser(userData)
    },
    [setUser],
  )

  const onUpdateUserData = useCallback(
    async (updatedUserData: User) => {
      try {
        setUser(updatedUserData)
        await saveUserStorage(updatedUserData)
      } catch (error) {
        setUser(null)
        throw error
      }
    },
    [setUser],
  )

  const loadLocalUserData = useCallback(async () => {
    try {
      const userStorage = await getUserStorage()
      const token = await getTokenStorage()
      if (userStorage && token) {
        updateUserSessionData(userStorage, token)
      }
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoadingStorage(false)
    }
  }, [updateUserSessionData])

  const onSignIn = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await api.post<SessionResponseProps>('/sessions', { email, password })
        if (!data?.token) {
          console.error('Error: Invalid token')
          setUser(null)
          return
        }
        await saveUserStorage(data.user)
        await saveTokenStorage(data.token)
        updateUserSessionData(data.user, data.token)
      } catch (error) {
        setUser(null)
        throw error
      }
    },
    [setUser, updateUserSessionData],
  )

  const onSignOut = useCallback(async () => {
    try {
      setLoadingStorage(true)
      setUser(null)
      await removeUserStorage()
      await removeTokenStorage()
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setLoadingStorage(false)
    }
  }, [setLoadingStorage, setUser])

  const onRefreshToken = useCallback(
    async (newToken: string) => {
      setRefreshedToken(newToken)
    },
    [setRefreshedToken],
  )

  useEffect(() => {
    loadLocalUserData()
  }, [loadLocalUserData])

  useEffect(() => {
    const subscribe = api.registerinterceptorTokenManager({
      onSignOut,
      onRefreshToken,
    })

    return () => {
      subscribe()
    }
  }, [onRefreshToken, onSignOut])

  const providerValues = useMemo(
    () => ({
      onSignIn,
      onSignOut,
      onUpdateUserData,
      onRefreshToken,
      user,
      loadingStorage,
      refreshedToken,
    }),
    [
      onSignIn,
      onSignOut,
      onUpdateUserData,
      onRefreshToken,
      user,
      loadingStorage,
      refreshedToken,
    ],
  )

  return <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
