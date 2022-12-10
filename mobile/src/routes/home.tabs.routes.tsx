import { Platform } from 'react-native'

import { House, Plus, SignOut, Tag } from 'phosphor-react-native'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { IconButton, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { Home } from '@pages/private/tabs/Home'
import { Logout } from '@pages/private/tabs/Logout'
import { HomeHeader } from '@pages/private/tabs/Home/components/HomeHeader'
import { MyProducts } from '@pages/private/tabs/MyProducts'

import { HomeTabRoutesProps, PrivateNavProps } from './types'

const { Navigator, Screen } = createBottomTabNavigator<HomeTabRoutesProps>()

export function HomeTabsRoutes() {
  const { colors, sizes, fonts } = useTheme()
  const { navigate } = useNavigation<PrivateNavProps>()

  const screenOptions: BottomTabNavigationOptions = {
    tabBarShowLabel: false,
    tabBarInactiveTintColor: colors.$gray['400'],
    tabBarActiveTintColor: colors.$gray['600'],
    tabBarStyle: {
      backgroundColor: colors.$gray['100'],
      borderTopWidth: 0,
      height: Platform.OS === 'android' ? 'auto' : 96,
      paddingBottom: sizes[10],
      paddingTop: sizes[6],
    },
  }

  function CustomCreateAdButtom() {
    return (
      <IconButton
        onPress={() => navigate('create-product')}
        mr="2"
        icon={<Plus size={24} color={colors.$gray[700]} weight="bold" />}
      />
    )
  }

  return (
    <Navigator screenOptions={screenOptions} initialRouteName="home">
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House weight={focused ? 'bold' : 'regular'} color={color} size={26} />
          ),
          headerBackground: () => <HomeHeader />,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.$gray[700],
          },
        }}
      />
      <Screen
        name="my-products"
        component={MyProducts}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag weight={focused ? 'bold' : 'regular'} color={color} size={26} />
          ),
          headerRight: () => <CustomCreateAdButtom />,
          headerTitle: 'Meus anúncios',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            color: colors.$gray[700],
            fontSize: sizes[5],
            // eslint-disable-next-line dot-notation
            fontFamily: fonts['heading'],
          },
          headerStyle: {
            backgroundColor: colors.$gray[200],
          },
        }}
      />

      <Screen
        name="logout"
        component={Logout}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SignOut
              weight={focused ? 'bold' : 'regular'}
              color={colors.$red['500']}
              size={26}
            />
          ),
        }}
      />
    </Navigator>
  )
}
