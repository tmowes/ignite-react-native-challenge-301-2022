import { HStack, Avatar, VStack, Heading, Text, useTheme, Button } from 'native-base'
import { Plus } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import { PrivateNavProps } from '@routes/types'
import { useAuth } from '@contexts/AuthProvider'
import { api } from '@services/api'
import avatarImg from '@assets/userPhotoDefault.png'

export function HomeHeader() {
  const { colors } = useTheme()
  const { navigate } = useNavigation<PrivateNavProps>()
  const { user } = useAuth()

  return (
    <HStack bg="$gray.200" pl="6" pr="2.5" pt="8" pb="2" alignItems="center" w="full">
      <Avatar
        source={
          user?.avatar ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` } : avatarImg
        }
        mr="4"
        size={12}
      />
      <VStack flex={1}>
        <Text fontSize="md">Boas vindas,</Text>
        <Heading fontSize="md">{user?.name}!</Heading>
      </VStack>
      <Button
        onPress={() => navigate('create-product')}
        variant="$continue"
        mb="0"
        h="9"
        maxW="2/5"
        leftIcon={<Plus size={16} color={colors.$gray[100]} weight="bold" />}
      >
        Criar anúncio
      </Button>
    </HStack>
  )
}
