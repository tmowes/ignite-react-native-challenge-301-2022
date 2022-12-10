import { LogBox, StatusBar } from 'react-native'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla'
import { NativeBaseProvider } from 'native-base'

import { Loading } from '@components/Loading'
import { theme } from '@styles/theme'
import { AuthProvider } from '@contexts/AuthProvider'

import { Routes } from './routes'

LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
  'Please pass alt prop to Image component',
])

export function AppSrc() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        </AuthProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  )
}
