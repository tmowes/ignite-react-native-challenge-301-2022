import { ProductImageForm } from '@models/form'

export type ProductFormProps = {
  defaultValues: {
    product_images: ProductImageForm[]
    name: string
    description: string
    price: string
    accept_trade: boolean
    is_new: string
    payment_methods: string[]
  }
  editingProductId?: string
}
