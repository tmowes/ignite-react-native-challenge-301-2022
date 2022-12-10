import { useNavigation } from '@react-navigation/native'
import { Button, Heading, HStack, Icon, Text, useTheme, VStack } from 'native-base'
import { ArrowRight, Tag } from 'phosphor-react-native'

import { PrivateNavProps } from '@routes/types'
import { useUserProducts } from '@contexts/UserProductsProvider'

export function MyAdsCard() {
  const { colors } = useTheme()
  const { navigate } = useNavigation<PrivateNavProps>()
  const { userProducts } = useUserProducts()

  const activeAdsCount = userProducts.filter(({ is_active }) => is_active).length

  return (
    <VStack my="4">
      <Text color="$gray.500" mb="2">
        Seus produtos anunciados para venda
      </Text>
      <HStack bg="$blue.100" pl="4" pr="2" py="3" alignItems="center" rounded="md">
        <Tag size={22} color={colors.$blue[500]} />
        <VStack flex={1} ml="3">
          <Heading fontSize="xl">{activeAdsCount}</Heading>
          <Text fontSize="sm">anúncios ativos</Text>
        </VStack>
        <Button
          onPress={() => navigate('my-products')}
          variant="$link"
          mb="0"
          mr="0"
          ml="auto"
          maxW="2/5"
          _text={{
            color: '$blue.500',
            fontSize: 'xs',
          }}
          rightIcon={
            <Icon
              ml="1"
              mt="1"
              as={<ArrowRight size={16} color={colors.$blue[500]} weight="regular" />}
            />
          }
        >
          Meus anúncios
        </Button>
      </HStack>
    </VStack>
  )
}
