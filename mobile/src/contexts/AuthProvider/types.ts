import { ReactNode } from 'react'

import { User } from '@models/user'

export type AuthContextProps = {
  user: User | null
  loadingStorage: boolean
  refreshedToken: string
  onSignIn: (email: string, password: string) => Promise<void>
  onSignOut: () => Promise<void>
  onUpdateUserData: (updatedUserData: User) => Promise<void>
  onRefreshToken: (newToken: string) => Promise<void>
}

export type AuthProviderProps = {
  children: ReactNode
}

export type SessionResponseProps = {
  token: string
  user: User
}
