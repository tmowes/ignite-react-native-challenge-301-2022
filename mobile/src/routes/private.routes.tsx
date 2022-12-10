import { useTheme } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CreateProduct } from '@pages/private/stack/CreateProduct'
import { PreviewHeader } from '@pages/private/stack/PreviewProduct/components/PreviewHeader'
import { PreviewProduct } from '@pages/private/stack/PreviewProduct'
import { ProductDetails } from '@pages/private/stack/ProductDetails'

import { HomeTabsRoutes } from './home.tabs.routes'
import { PrivateRoutesProps } from './types'

const { Navigator, Screen } = createNativeStackNavigator<PrivateRoutesProps>()

export default function PrivateRoutes() {
  const { colors, sizes } = useTheme()

  return (
    <Navigator initialRouteName="home-tabs">
      <Screen name="home-tabs" component={HomeTabsRoutes} options={{ headerShown: false }} />
      <Screen
        name="create-product"
        component={CreateProduct}
        options={{
          headerTitle: '',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            color: colors.$gray[700],
            fontSize: sizes[5],
            fontFamily: 'Karla_700Bold',
          },
          headerStyle: {
            backgroundColor: colors.$gray[200],
          },
        }}
      />

      <Screen
        name="preview-product"
        component={PreviewProduct}
        options={{ header: () => <PreviewHeader /> }}
      />
      <Screen
        name="product-details"
        component={ProductDetails}
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.$gray[200],
          },
        }}
      />
    </Navigator>
  )
}
