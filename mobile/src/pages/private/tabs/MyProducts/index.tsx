import { useCallback, useState } from 'react'

import { VStack, FlatList, Center, Heading } from 'native-base'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Product } from '@models/product'

import { ProductCard } from '@components/ProductCard'
import { PrivateNavProps } from '@routes/types'
import { useUserProducts } from '@contexts/UserProductsProvider'

import { AdTypesSelect } from './components/AdTypesSelect'
import { ProductTypes, ProductTypesEnum } from './types'

const productsTypes = [
  { label: 'Todos', value: 'all' },
  { label: 'Ativos', value: 'active' },
  { label: 'Inativos', value: 'inactive' },
] as ProductTypes[]

const filteredUserProductsByType = (products: Product[], type: ProductTypesEnum) => {
  if (type === 'active') {
    return products.filter(({ is_active }) => is_active)
  }

  if (type === 'inactive') {
    return products.filter(({ is_active }) => !is_active)
  }
  return products
}

export function MyProducts() {
  const { navigate } = useNavigation<PrivateNavProps>()
  const { userProducts, onLoadUserProducts } = useUserProducts()
  const [selectedProductType, setSelectedProductType] = useState<ProductTypesEnum>('all')

  const filteredUserProducts = filteredUserProductsByType(userProducts, selectedProductType)

  const productsCount = filteredUserProducts.length

  useFocusEffect(
    useCallback(() => {
      onLoadUserProducts()
    }, [onLoadUserProducts]),
  )

  return (
    <VStack flex={1} px="6" bg="$gray.200">
      <FlatList
        data={filteredUserProducts}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={() => (
          <AdTypesSelect
            productsCount={`${productsCount} anúncios`}
            productsTypes={productsTypes}
            selectedValue={selectedProductType}
            onValueChange={(value) => setSelectedProductType(value as ProductTypesEnum)}
          />
        )}
        renderItem={({ item }) => (
          <ProductCard
            onPress={() => navigate('product-details', { id: item.id })}
            data={item}
          />
        )}
        ListEmptyComponent={
          <Center flex={1}>
            <Heading color="$gray.500" textAlign="center" fontSize="md">
              Nenhum anúncio encontrado
            </Heading>
          </Center>
        }
      />
    </VStack>
  )
}
