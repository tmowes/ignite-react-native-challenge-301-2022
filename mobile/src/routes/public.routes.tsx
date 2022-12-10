import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignUp } from '@pages/public/stack/SignUp'
import { SignIn } from '@pages/public/stack/SignIn'

import { PublicRoutesProps } from './types'

const { Navigator, Screen } = createNativeStackNavigator<PublicRoutesProps>()

export default function PublicRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="sign-in" component={SignIn} />
      <Screen name="sign-up" component={SignUp} />
    </Navigator>
  )
}
