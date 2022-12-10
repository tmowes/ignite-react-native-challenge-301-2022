import type {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export type PublicRoutesProps = {
  'sign-in': undefined
  'sign-up': undefined
}

export type PrivateRoutesProps = {
  'home-tabs': NavigatorScreenParams<HomeTabRoutesProps>
  'product-details': { id: string }
  'create-product': { id: string } | undefined
  'preview-product': { id: string }
}

export type HomeTabRoutesProps = {
  home: undefined
  'my-products': undefined
  logout: undefined
}

export type PublicNavProps = NativeStackNavigationProp<PublicRoutesProps>

export type PrivateNavProps = CompositeNavigationProp<
  NativeStackNavigationProp<PrivateRoutesProps>,
  BottomTabNavigationProp<HomeTabRoutesProps>
>

export type AdDetailsRouteProp = RouteProp<PrivateRoutesProps, 'product-details'>
export type EditingPreviewRouteProp = RouteProp<PrivateRoutesProps, 'preview-product'>
export type EditingAdRouteProp = RouteProp<PrivateRoutesProps, 'create-product'>
