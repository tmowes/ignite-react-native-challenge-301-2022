import { TouchableOpacity } from 'react-native'

import { Avatar, Box, Center, Heading, Image, Text, VStack } from 'native-base'

import { api } from '@services/api'
import avatarImg from '@assets/userPhotoDefault.png'
import { priceFormatted } from '@utils/formatPrice'

import { ProductCardProps } from './types'

export function ProductCard(props: ProductCardProps) {
  const { data, onPress } = props

  const { name, price, is_new, is_active, product_images, user } = data

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ flex: 1, maxWidth: '48%', marginBottom: 12 }}
    >
      <VStack flex={1} alignItems="center" justifyContent="center" h="144px">
        <Box rounded="md" overflow="hidden" w="full" position="relative">
          <Image
            source={
              product_images?.length > 0
                ? { uri: `${api.defaults.baseURL}/images/${product_images[0].path}` }
                : avatarImg
            }
            alt={name}
            resizeMode="cover"
            w="full"
            h="100px"
          />
          {user?.avatar && (
            <Avatar
              source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
              position="absolute"
              top="1"
              left="1"
              size="xs"
              borderWidth="1"
              borderColor="$gray.100"
              zIndex={49}
            />
          )}
          <Center
            bgColor={is_new ? '$blue.500' : '$gray.500'}
            position="absolute"
            top="1"
            right="1"
            rounded="full"
            h="4"
            px="2"
          >
            <Heading fontSize="10px" color="$gray.100" textTransform="uppercase">
              {is_new ? 'novo' : 'usado'}
            </Heading>
          </Center>
          {!is_active && !user?.avatar && (
            <>
              <Center
                bg="$gray.700"
                opacity={0.5}
                position="absolute"
                top="0"
                right="0"
                bottom="0"
                left="0"
                rounded="md"
                zIndex={99}
              />
              <Text
                position="absolute"
                bottom="2"
                left="0"
                right="0"
                fontSize="10px"
                textAlign="center"
                fontFamily="Karla_700Bold"
                textTransform="uppercase"
                color="$gray.100"
                letterSpacing="2xl"
                zIndex={99}
              >
                Anúncio desativado
              </Text>
            </>
          )}
        </Box>

        <VStack flex={1} w="full" opacity={!is_active && !user?.avatar ? 0.5 : 1}>
          <Text fontSize="sm" noOfLines={1} color="$gray.600">
            {name}
          </Text>
          <Heading fontSize="md">
            <Heading fontSize="xs">R$ </Heading>
            {priceFormatted(price)}
          </Heading>
        </VStack>
      </VStack>
    </TouchableOpacity>
  )
}
