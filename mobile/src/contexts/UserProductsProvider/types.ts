import { ReactNode } from 'react'

import { Product } from '@models/product'
import { ProductImage } from '@models/productImage'

import { FormDataOutputProps } from '@pages/private/stack/CreateProduct/components/ProductForm/schema'

export type UserProductsProviderProps = {
  children: ReactNode
}

export type UserProductsContextProps = {
  loading: boolean
  userProducts: Product[]
  productPreview: FormDataOutputProps | null
  onLoadUserProducts: () => Promise<void>
  onCreateUserProductPreview: (product: FormDataOutputProps) => Promise<void>
  onCreateUserProduct: (product: FormDataOutputProps) => Promise<void>
  onUpdateUserProduct: (
    updatedProduct: FormDataOutputProps,
    productId: string,
    previousProductImages: ProductImage[] | undefined,
  ) => Promise<void>
  onDeleteUserProduct: (productId: string) => Promise<void>
}
