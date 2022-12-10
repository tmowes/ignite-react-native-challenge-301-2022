import { createContext, useState, useEffect, useMemo, useContext, useCallback } from 'react'

import { CreateProduct, Product } from '@models/product'
import { ProductImage } from '@models/productImage'

import { useAuth } from '@contexts/AuthProvider'
import { api } from '@services/api'
import { FormDataOutputProps } from '@pages/private/stack/CreateProduct/components/ProductForm/schema'

import { UserProductsContextProps, UserProductsProviderProps } from './types'

const UserProductsContext = createContext({} as UserProductsContextProps)

export function UserProductsProvider(props: UserProductsProviderProps) {
  const { children } = props
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [userProducts, setUserProducts] = useState<Product[]>([])
  const [productPreview, setProductPreview] = useState<FormDataOutputProps | null>(null)

  const onLoadUserProducts = useCallback(async () => {
    if (user?.id) {
      const { data } = await api.get('/users/products')
      setUserProducts(data)
    }
    setLoading(false)
  }, [user?.id])

  const onCreateUserProductPreview = useCallback(async (product: FormDataOutputProps) => {
    setProductPreview(product)
  }, [])

  const onCreateUserProduct = useCallback(async (newProduct: FormDataOutputProps) => {
    const newProductData: CreateProduct = {
      name: newProduct.name,
      description: newProduct.description,
      is_new: newProduct.is_new,
      price: newProduct.price,
      accept_trade: newProduct.accept_trade,
      payment_methods: newProduct.payment_methods,
    }
    try {
      const { data } = await api.post('/products', newProductData)

      const createProductImagesFormData = new FormData()
      createProductImagesFormData.append('product_id', data.id)
      newProduct.product_images.forEach((image: any) => {
        createProductImagesFormData.append('images', image)
      })

      await api.post('/products/images/', createProductImagesFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setUserProducts((prevState) => [...prevState, data])
    } catch (error) {
      console.error(error)
    }
  }, [])

  const onUpdateUserProduct = useCallback(
    async (
      updatedProduct: FormDataOutputProps,
      productId: string,
      previousProductImages?: ProductImage[],
    ) => {
      const updatedProductData: CreateProduct = {
        name: updatedProduct.name,
        description: updatedProduct.description,
        is_new: updatedProduct.is_new,
        price: updatedProduct.price,
        accept_trade: updatedProduct.accept_trade,
        payment_methods: updatedProduct.payment_methods,
      }

      try {
        await api.put(`/products/${productId}`, updatedProductData)

        const newProductImages = updatedProduct.product_images.filter((image) =>
          image.uri.startsWith('file://'),
        )
        if (previousProductImages) {
          const removedImages = previousProductImages
            .filter(
              ({ id }) => !updatedProduct.product_images.map(({ name }) => name).includes(id),
            )
            .map(({ id }) => id)

          if (removedImages.length > 0) {
            await api.delete(`/products/images`, {
              data: { productImagesIds: removedImages },
            })
          }
        }

        if (newProductImages.length > 0) {
          const createProductImagesFormData = new FormData()
          createProductImagesFormData.append('product_id', productId)
          newProductImages.forEach((image: any) => {
            createProductImagesFormData.append('images', image)
          })
          await api.post('/products/images/', createProductImagesFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        }

        const { data } = await api.get('/users/products')
        setUserProducts(data)
      } catch (error) {
        console.error(error)
      }
    },
    [],
  )

  const onDeleteUserProduct = useCallback(
    async (productId: string) => {
      try {
        setLoading(true)
        if (user?.id) {
          await api.delete(`/products/${productId}`)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [user?.id],
  )

  useEffect(() => {
    onLoadUserProducts()
  }, [onLoadUserProducts])

  const providerValues = useMemo(
    () => ({
      loading,
      userProducts,
      productPreview,
      onCreateUserProductPreview,
      onLoadUserProducts,
      onCreateUserProduct,
      onUpdateUserProduct,
      onDeleteUserProduct,
    }),
    [
      loading,
      userProducts,
      productPreview,
      onCreateUserProductPreview,
      onLoadUserProducts,
      onCreateUserProduct,
      onUpdateUserProduct,
      onDeleteUserProduct,
    ],
  )

  return (
    <UserProductsContext.Provider value={providerValues}>
      {children}
    </UserProductsContext.Provider>
  )
}

export function useUserProducts() {
  const context = useContext(UserProductsContext)
  if (!context) {
    throw new Error('useUserProducts must be used within a UserProductsProvider')
  }
  return context
}
