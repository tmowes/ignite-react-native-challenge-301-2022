import { ProductTypes, ProductTypesEnum } from '../../types'

export type AdTypesSelectProps = {
  productsCount: string
  productsTypes: ProductTypes[]
  selectedValue: ProductTypesEnum
  onValueChange: (itemValue: string) => void
}
