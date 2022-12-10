import { Dimensions } from 'react-native'
import { useCallback, useEffect, useState } from 'react'

import {
  Avatar,
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Product } from '@models/product'

import { ProductTypeBadge } from '@components/ProductTypeBadge'
import { AdDetailsRouteProp, PrivateNavProps } from '@routes/types'
import { api } from '@services/api'
import { Loading } from '@components/Loading'
import avatarImg from '@assets/userPhotoDefault.png'
import { priceFormatted } from '@utils/formatPrice'
import { useAuth } from '@contexts/AuthProvider'
import { useUserProducts } from '@contexts/UserProductsProvider'

import { ProductDetailsFooter } from './components/ProductDetailsFooter'
import { ProductDetailsFooterOwner } from './components/ProductDetailsFooterOwner'

const { width } = Dimensions.get('window')

export function ProductDetails() {
  const { user } = useAuth()
  const { onDeleteUserProduct } = useUserProducts()
  const { colors } = useTheme()
  const { navigate } = useNavigation<PrivateNavProps>()
  const { params } = useRoute<AdDetailsRouteProp>()
  const { id } = params
  const [loadingInfo, setLoadingInfo] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [productDetails, setProductDetails] = useState<Product | null>(null)

  const onProductDelete = async () => {
    try {
      setIsSubmitting(true)
      await onDeleteUserProduct(id)
      navigate('my-products')
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
    }
  }

  const loadProductDetails = useCallback(async () => {
    try {
      const { data } = await api.get(`/products/${id}`)
      setProductDetails(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingInfo(false)
    }
  }, [id])

  useEffect(() => {
    loadProductDetails()
  }, [loadProductDetails])

  if (loadingInfo || !productDetails) {
    return <Loading />
  }

  const onProductStatusChange = async () => {
    try {
      setIsSubmitting(true)
      await api.patch(`/products/${id}`, { is_active: !productDetails?.is_active })
      await loadProductDetails()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const paymentMethods = productDetails.payment_methods.map(({ key }) => key)

  const isMyOwnAd = productDetails.user_id === user?.id

  return (
    <VStack flex={1} bg="$gray.200">
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        <Center w="full" h="280px" position="relative">
          <Carousel
            loop
            width={width}
            height={280}
            autoPlay={productDetails.is_active && productDetails.product_images.length > 1}
            data={productDetails.product_images}
            scrollAnimationDuration={1000}
            panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
            renderItem={({ item }) => (
              <Image
                alt={productDetails.name}
                source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
                h="280px"
              />
            )}
          />
          {!productDetails.is_active && (
            <Center
              position="absolute"
              bgColor="$alpha.60"
              top={0}
              bottom={0}
              left={0}
              right={0}
            >
              <Text
                fontSize="md"
                textAlign="center"
                fontFamily="Karla_700Bold"
                textTransform="uppercase"
                color="$gray.100"
                letterSpacing="2xl"
              >
                Anúncio desativado
              </Text>
            </Center>
          )}
        </Center>

        <VStack flex={1} px="6" mt="4">
          <HStack alignItems="center" mb="6">
            <Avatar
              source={
                productDetails.user?.avatar
                  ? { uri: `${api.defaults.baseURL}/images/${productDetails.user.avatar}` }
                  : avatarImg
              }
              mr="4"
              size={8}
            />
            <Text fontSize="md">{productDetails.user?.name}</Text>
          </HStack>

          <ProductTypeBadge type={productDetails.is_new ? 'new' : 'used'} mr="auto" mb="1" />
          <HStack alignItems="center" mb="2" justifyContent="space-between">
            <Heading fontSize="lg" lineHeight="xl">
              {productDetails.name}
            </Heading>
            <Heading fontSize="lg" color="$blue.700">
              <Heading fontSize="xs" color="$blue.700" lineHeight="xl">
                R${' '}
              </Heading>
              {priceFormatted(productDetails.price)}
            </Heading>
          </HStack>
          <Text>{productDetails.description}</Text>
          <HStack alignItems="center" my="4">
            <Heading fontSize="md" color="$gray.600">
              Aceita troca?
            </Heading>
            <Text ml="2" fontSize="md" color="$gray.600">
              {productDetails.accept_trade ? 'Sim' : 'Não'}
            </Text>
          </HStack>

          <Heading fontSize="md" color="$gray.600">
            Meios de pagamento:
          </Heading>
          <VStack space={2} mt="2">
            {paymentMethods.includes('boleto') && (
              <HStack alignItems="center">
                <Barcode size={18} color={colors.$gray[700]} weight="regular" />
                <Text ml="2" fontSize="md" color="$gray.600">
                  Boleto
                </Text>
              </HStack>
            )}
            {paymentMethods.includes('pix') && (
              <HStack alignItems="center">
                <QrCode size={18} color={colors.$gray[700]} weight="regular" />
                <Text ml="2" fontSize="md" color="$gray.600">
                  Pix
                </Text>
              </HStack>
            )}
            {paymentMethods.includes('cash') && (
              <HStack alignItems="center">
                <Money size={18} color={colors.$gray[700]} weight="regular" />
                <Text ml="2" fontSize="md" color="$gray.600">
                  Dinheiro
                </Text>
              </HStack>
            )}
            {paymentMethods.includes('card') && (
              <HStack alignItems="center">
                <CreditCard size={18} color={colors.$gray[700]} weight="regular" />
                <Text ml="2" fontSize="md" color="$gray.600">
                  Cartão de crédito
                </Text>
              </HStack>
            )}
            {paymentMethods.includes('deposit') && (
              <HStack alignItems="center">
                <Bank size={18} color={colors.$gray[700]} weight="regular" />
                <Text ml="2" fontSize="md" color="$gray.600">
                  Depósito bancário
                </Text>
              </HStack>
            )}
          </VStack>
        </VStack>
      </ScrollView>
      {isMyOwnAd ? (
        <ProductDetailsFooterOwner
          product_id={id}
          isActive={productDetails.is_active}
          isSubmitting={isSubmitting}
          onProductStatusChange={onProductStatusChange}
          onProductDelete={onProductDelete}
        />
      ) : (
        <ProductDetailsFooter
          contact={productDetails.user?.tel}
          priceFormatted={priceFormatted(productDetails.price)}
        />
      )}
    </VStack>
  )
}
