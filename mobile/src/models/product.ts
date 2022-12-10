import { PaymentMethod } from './paymentMethod'
import { ProductImage } from './productImage'
import { User } from './user'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  is_new: boolean
  accept_trade: boolean
  user_id: string
  is_active: boolean
  product_images: ProductImage[]
  payment_methods: PaymentMethod[]
  user?: Pick<User, 'avatar' | 'tel' | 'name'>
}

export type CreateProduct = {
  name: string
  description: string
  price: number
  is_new: boolean
  accept_trade: boolean
  payment_methods: string[]
}
