import { useCallback } from 'react'

import { Text, VStack } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'

import { Loading } from '@components/Loading'
import { useAuth } from '@contexts/AuthProvider'

export function Logout() {
  const { onSignOut } = useAuth()

  useFocusEffect(
    useCallback(() => {
      onSignOut()
    }, [onSignOut]),
  )

  return (
    <VStack flex={1}>
      <Loading />
      <Text mt="4" color="$blue.500">
        Saindo da conta...
      </Text>
    </VStack>
  )
}
