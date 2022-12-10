import { Loading } from '@components/Loading'
import { useAuth } from '@contexts/AuthProvider'
import { UserProductsProvider } from '@contexts/UserProductsProvider'

import PrivateRoutes from './private.routes'
import PublicRoutes from './public.routes'

export function AppRoutes() {
  const { user, loadingStorage } = useAuth()

  if (loadingStorage) {
    return <Loading />
  }

  if (user) {
    return (
      <UserProductsProvider>
        <PrivateRoutes />
      </UserProductsProvider>
    )
  }

  return <PublicRoutes />
}
