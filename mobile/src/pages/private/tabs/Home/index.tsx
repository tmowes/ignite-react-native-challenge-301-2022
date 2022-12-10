import { useCallback, useEffect, useState } from 'react'
import { Keyboard, RefreshControl } from 'react-native'

import {
  Button,
  Checkbox,
  Circle,
  FlatList,
  Flex,
  FormControl,
  Heading,
  HStack,
  Icon,
  Modal,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Product } from '@models/product'
import { X } from 'phosphor-react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ProductCard } from '@components/ProductCard'
import { PrivateNavProps } from '@routes/types'
import { api } from '@services/api'
import { convertFilterNewQuery } from '@utils/convertFilterNew'
import { InputControlled } from '@components/InputControlled'
import { SkeletonProductCard } from '@components/SkeletonProductCard'
import { SwitchControlled } from '@components/SwitchControlled'
import { Loading } from '@components/Loading'
import LogoSvg from '@assets/logo.svg'

import { MyAdsCard } from './components/MyAdsCard'
import { SearchSettingsButton } from './components/SearchSettingsButton'
import { filterSchema, FormDataProps } from './schema'

const defaultValues = {
  searchValue: '',
  acceptTrade: true,
  filterNew: true,
  filterUsed: true,
  paymentMethods: [
    'payment_methods=boleto',
    'payment_methods=pix',
    'payment_methods=cash',
    'payment_methods=card',
    'payment_methods=deposit',
  ],
  hasFiltersApplied: false,
}

export function Home() {
  const { colors } = useTheme()
  const { navigate } = useNavigation<PrivateNavProps>()
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  const { control, handleSubmit, reset, getValues } = useForm<FormDataProps>({
    defaultValues,
    resolver: zodResolver(filterSchema),
  })

  const loadProducts = useCallback(async () => {
    setLoadingProducts(true)
    const { data } = await api.get('/products')
    setProducts(data)
    setLoadingProducts(false)
    setIsLoading(false)
  }, [])

  const loadFilteredProducts = async ({
    searchValue,
    filterNew,
    acceptTrade,
    filterUsed,
    paymentMethods,
    hasFiltersApplied,
  }: FormDataProps) => {
    setShowModal(false)
    Keyboard.dismiss()
    setLoadingProducts(true)
    const isNewQuery = convertFilterNewQuery(filterNew, filterUsed)
    const acceptTradeQuery = `accept_trade=${acceptTrade}`
    const query = [isNewQuery, acceptTradeQuery, ...paymentMethods].filter(Boolean).join('&')
    const combinedFilters = hasFiltersApplied ? `&${query}` : ''
    let searchQuery = ''
    try {
      if (searchValue.trim()) {
        searchQuery = `query=${searchValue.trim()}`
      }
      const { data } = await api.get(`/products?${searchQuery}${combinedFilters}`)
      setProducts(data)
      setLoadingProducts(false)
    } catch (error) {
      console.error(error)
      setLoadingProducts(false)
    }
  }

  const onFilterReset = useCallback(() => {
    loadProducts()
    reset(defaultValues)
    setShowModal(false)
  }, [loadProducts, reset])

  const onSearchReset = useCallback(() => {
    loadProducts()
    reset({ ...getValues(), searchValue: '' })
  }, [getValues, loadProducts, reset])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} px="6" bg="$gray.200">
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        mt="2"
        bg="transparent"
        _important={{ bg: 'transparent' }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        refreshControl={<RefreshControl refreshing={false} onRefresh={loadProducts} />}
        ListHeaderComponent={() => (
          <>
            <MyAdsCard />
            <VStack mb="4">
              <Text color="$gray.500" mb="2">
                Compre produtos variados
              </Text>
              <Controller
                control={control}
                name="searchValue"
                render={({ field: { onChange, value } }) => (
                  <InputControlled
                    placeholder="Buscar anúncio"
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(loadFilteredProducts)}
                    returnKeyType="search"
                    InputRightElement={
                      <SearchSettingsButton
                        hasContent={!!value}
                        onSearchReset={onSearchReset}
                        onSearchPress={handleSubmit(loadFilteredProducts)}
                        onFilterPress={() => setShowModal(true)}
                      />
                    }
                  />
                )}
              />
            </VStack>
          </>
        )}
        renderItem={({ item }) => {
          if (!loadingProducts) {
            return (
              <ProductCard
                onPress={() => navigate('product-details', { id: item.id })}
                data={item}
              />
            )
          }
          return <SkeletonProductCard />
        }}
        ListEmptyComponent={
          <Flex align="center" flex={1} key="ListEmptyComponent:Center">
            <VStack alignItems="center" key="ListEmptyComponent:VStack" px="8">
              <LogoSvg height={48} key="ListEmptyComponent:LogoSvg" />
              <Text
                key="ListEmptyComponent:Heading"
                color="$gray.400"
                textAlign="center"
                fontSize="md"
                mt="4"
              >
                Nenhum anúncio encontrado
              </Text>
            </VStack>
            {getValues('hasFiltersApplied') && (
              <Button
                key="ListEmptyComponent:hasFiltersApplied"
                onPress={onFilterReset}
                variant="$cancel"
                mt="4"
                w="auto"
                mx="auto"
                px="8"
                h="8"
              >
                Limpar filtros
              </Button>
            )}
            {getValues('searchValue').trim() && (
              <Button
                key="ListEmptyComponent:searchValue"
                onPress={onSearchReset}
                variant="$cancel"
                mt="4"
                w="auto"
                mx="auto"
                px="8"
                h="8"
              >
                Limpar busca
              </Button>
            )}
          </Flex>
        }
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="full" px="6">
        <Modal.Content bg="$gray.200" borderColor="$gray.200">
          <Modal.CloseButton />
          <Modal.Header
            bg="$gray.200"
            borderColor="$gray.200"
            _text={{
              color: '$gray.700',
              fontSize: 'lg',
              fontFamily: 'Karla_700Bold',
            }}
          >
            Filtrar anúncios
          </Modal.Header>
          <Modal.Body _text={{ color: '$gray.600' }}>
            <VStack space={3}>
              <Heading fontSize="md" color="$gray.600">
                Condição
              </Heading>
              <HStack space={3} w="full" mb="1">
                <Controller
                  control={control}
                  name="filterNew"
                  render={({ field: { onChange, value } }) => (
                    <Button
                      w="auto"
                      h="6"
                      px="4"
                      rounded="full"
                      bg={value ? '$blue.700' : '$gray.400'}
                      onPress={() => onChange(!value)}
                      position="relative"
                      _text={{
                        fontSize: 'xs',
                        textTransform: 'uppercase',
                      }}
                      rightIcon={
                        <Circle
                          size="3"
                          borderRadius="full"
                          bg={value ? '$gray.200' : '$gray.400'}
                          position="absolute"
                          right="-10"
                        >
                          {value && (
                            <Icon
                              as={<X size={10} color={colors.$blue['700']} weight="bold" />}
                            />
                          )}
                        </Circle>
                      }
                    >
                      novo
                    </Button>
                  )}
                />
                <Controller
                  control={control}
                  name="filterUsed"
                  render={({ field: { onChange, value } }) => (
                    <Button
                      w="auto"
                      h="6"
                      px="4"
                      rounded="full"
                      bg={value ? '$blue.700' : '$gray.400'}
                      onPress={() => onChange(!value)}
                      position="relative"
                      rightIcon={
                        <Circle
                          size="3"
                          borderRadius="full"
                          bg={value ? '$gray.200' : '$gray.400'}
                          position="absolute"
                          right="-10"
                        >
                          {value && (
                            <Icon
                              as={<X size={10} color={colors.$blue['700']} weight="bold" />}
                            />
                          )}
                        </Circle>
                      }
                      _text={{
                        fontSize: 'xs',
                        textTransform: 'uppercase',
                      }}
                    >
                      usado
                    </Button>
                  )}
                />
              </HStack>
              <HStack alignItems="center" space="3" my="-8">
                <Heading fontSize="md" color="$gray.600" lineHeight="md">
                  Aceita troca?
                </Heading>
                <Controller
                  control={control}
                  name="acceptTrade"
                  render={({ field: { onChange, value } }) => (
                    <SwitchControlled
                      value={value}
                      onToggle={onChange}
                      mr="auto"
                      mt="4"
                      w="auto"
                      h="10"
                      size="lg"
                      offThumbColor="$gray.100"
                      offTrackColor="$gray.400"
                      onThumbColor="$gray.100"
                      onTrackColor="$blue.700"
                    />
                  )}
                />
              </HStack>
              <Heading fontSize="md" color="$gray.600" mt="3" mb="-3">
                Meios de pagamento aceitos:
              </Heading>
              <VStack space="2">
                <Controller
                  control={control}
                  name="paymentMethods"
                  render={({ field: { onChange, value } }) => (
                    <FormControl>
                      <Checkbox.Group onChange={onChange} value={value} colorScheme="muted">
                        <Checkbox value="payment_methods=boleto">Boleto</Checkbox>
                        <Checkbox value="payment_methods=pix">Pix</Checkbox>
                        <Checkbox value="payment_methods=cash">Dinheiro</Checkbox>
                        <Checkbox value="payment_methods=card">Cartão de Crédito</Checkbox>
                        <Checkbox value="payment_methods=deposit">Depósito Bancário</Checkbox>
                      </Checkbox.Group>
                    </FormControl>
                  )}
                />
              </VStack>
            </VStack>
          </Modal.Body>
          <Controller
            control={control}
            name="hasFiltersApplied"
            render={({ field: { onChange, value } }) => (
              <Modal.Footer bg="$gray.200" borderColor="$gray.200">
                <Button.Group space={2} w="full" justifyContent="space-between">
                  <Button
                    variant="$cancel"
                    isDisabled={!value}
                    maxW="48%"
                    w="1/2"
                    h="10"
                    m="0"
                    onPress={() => {
                      onChange(false)
                      onFilterReset()
                    }}
                  >
                    Resetar filtros
                  </Button>
                  <Button
                    onPress={() => {
                      onChange(true)
                      handleSubmit(loadFilteredProducts)()
                    }}
                    variant="$continue"
                    maxW="48%"
                    w="1/2"
                    h="10"
                    m="0"
                  >
                    Aplicar filtros
                  </Button>
                </Button.Group>
              </Modal.Footer>
            )}
          />
        </Modal.Content>
      </Modal>
    </VStack>
  )
}
