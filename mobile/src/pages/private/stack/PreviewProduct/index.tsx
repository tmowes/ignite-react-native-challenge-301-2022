import { Dimensions } from 'react-native'
import { useCallback, useState } from 'react'

import {
  Avatar,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, Tag } from 'phosphor-react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'

import avatarImg from '@assets/userPhotoDefault.png'
import { ProductTypeBadge } from '@components/ProductTypeBadge'
import { EditingPreviewRouteProp, PrivateNavProps } from '@routes/types'
import { useUserProducts } from '@contexts/UserProductsProvider'
import { Loading } from '@components/Loading'
import { useAuth } from '@contexts/AuthProvider'
import { api } from '@services/api'
import { priceFormatted } from '@utils/formatPrice'

const { width } = Dimensions.get('window')

export function PreviewProduct() {
  const { colors } = useTheme()
  const { navigate } = useNavigation<PrivateNavProps>()
  const { params } = useRoute<EditingPreviewRouteProp>()
  const { id } = params
  const { user } = useAuth()
  const { userProducts, productPreview, onCreateUserProduct, onUpdateUserProduct } =
    useUserProducts()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onProductPublish = useCallback(async () => {
    if (!productPreview) return
    try {
      setIsSubmitting(true)
      if (id === '') {
        await onCreateUserProduct(productPreview)
      } else {
        const previousProductImages = userProducts.find(
          (product) => product.id === id,
        )?.product_images
        await onUpdateUserProduct(productPreview, id, previousProductImages)
      }
      navigate('my-products')
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
    }
  }, [id, navigate, onCreateUserProduct, onUpdateUserProduct, productPreview, userProducts])

  if (!productPreview) {
    return <Loading />
  }

  const { payment_methods: paymentMethods } = productPreview

  return (
    <VStack flex={1} bg="$gray.200">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Center w="full" h="280px" position="relative">
          <Carousel
            loop
            width={width}
            height={280}
            autoPlay={productPreview.product_images.length > 1}
            data={productPreview.product_images}
            scrollAnimationDuration={1000}
            panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
            renderItem={({ item, index }) => (
              <Image
                alt={`${productPreview.name}-${index}`}
                source={{ uri: `${item.uri}` }}
                h="280px"
              />
            )}
          />
        </Center>
        <VStack flex={1} px="6" mt="4">
          <HStack alignItems="center" mb="6">
            <Avatar
              source={
                user?.avatar
                  ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
                  : avatarImg
              }
              mr="4"
              size={8}
            />
            <Text fontSize="md">{user?.name}</Text>
          </HStack>

          <ProductTypeBadge type={productPreview.is_new ? 'new' : 'used'} mr="auto" mb="1" />
          <HStack alignItems="center" mb="2" justifyContent="space-between">
            <Heading fontSize="lg" lineHeight="xl">
              {productPreview.name}
            </Heading>
            <Heading fontSize="lg" color="$blue.700">
              <Heading fontSize="xs" color="$blue.700" lineHeight="xl">
                R${' '}
              </Heading>
              {priceFormatted(productPreview.price)}
            </Heading>
          </HStack>
          <Text>{productPreview.description}</Text>
          <HStack alignItems="center" my="4">
            <Heading fontSize="md" color="$gray.600">
              Aceita troca?
            </Heading>
            <Text ml="2" fontSize="md" color="$gray.600">
              {productPreview.accept_trade ? 'Sim' : 'Não'}
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

      <HStack
        alignItems="center"
        justifyContent="space-between"
        px="8"
        position="absolute"
        bottom={0}
        w="full"
        bg="$gray.100"
        py="2"
        space={4}
      >
        <Button
          onPress={() => navigate('create-product')}
          variant="$cancel"
          maxW="1/2"
          h="10"
          leftIcon={
            <Icon as={<ArrowLeft size={16} color={colors.$gray[700]} weight="regular" />} />
          }
        >
          Voltar e editar
        </Button>
        <Button
          onPress={onProductPublish}
          isLoading={isSubmitting}
          variant="$solid"
          maxW="1/2"
          h="10"
          leftIcon={<Icon as={<Tag size={16} color={colors.$gray[100]} weight="regular" />} />}
        >
          Publicar
        </Button>
      </HStack>
    </VStack>
  )
}
