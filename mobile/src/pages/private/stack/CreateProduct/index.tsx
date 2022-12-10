import { useCallback, useEffect, useState } from 'react'

import { VStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Product } from '@models/product'

import { EditingAdRouteProp, PrivateNavProps } from '@routes/types'
import { api } from '@services/api'
import { Loading } from '@components/Loading'
import { priceFormatted } from '@utils/formatPrice'

import { ProductForm } from './components/ProductForm'
import { FormDataInputProps } from './components/ProductForm/schema'

const baseDefaultValues = {
  product_images: [],
  name: '',
  description: '',
  price: '',
  is_new: 'is_new',
  accept_trade: false,
  payment_methods: [],
} as FormDataInputProps

export function CreateProduct() {
  const { params } = useRoute<EditingAdRouteProp>()
  const { setOptions } = useNavigation<PrivateNavProps>()
  const [loadingInfo, setLoadingInfo] = useState(true)
  const [defaultValues, setDefaultValues] = useState<FormDataInputProps>(baseDefaultValues)

  const loadEditingProductData = useCallback(
    async (product_id?: string) => {
      if (!product_id) {
        setDefaultValues(baseDefaultValues)
        setOptions({ headerTitle: 'Criar anúncio' })
        setLoadingInfo(false)
        return
      }
      try {
        const { data } = await api.get<Product>(`/products/${product_id}`)
        setOptions({ headerTitle: 'Editar anúncio' })
        setDefaultValues({
          product_images: data.product_images.map(({ id, path }) => ({
            name: id,
            uri: `${api.defaults.baseURL}/images/${path}`,
            type: '',
          })),
          name: data.name,
          description: data.description,
          is_new: data.is_new ? 'is_new' : 'is_used',
          price: priceFormatted(data.price),
          accept_trade: data.accept_trade,
          payment_methods: data.payment_methods.map(({ key }) => key) ?? [],
        })
        setLoadingInfo(false)
      } catch (error) {
        console.error(error)
      }
    },
    [setOptions],
  )

  useEffect(() => {
    loadEditingProductData(params?.id)
  }, [loadEditingProductData, params?.id])

  if (loadingInfo) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="$gray.200">
      <ProductForm defaultValues={defaultValues} editingProductId={params?.id} />
    </VStack>
  )
}
