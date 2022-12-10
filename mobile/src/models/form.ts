export type ProductFormProps = {
  name: string
  description: string
  price: string
  is_new: string
  accept_trade: boolean
  product_images: ProductImageForm[]
  payment_methods: string[]
}

export type ProductImageForm = {
  name: string
  uri: string
  type: string
}
