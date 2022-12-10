import { ProductImageForm } from '@models/form'

export type ImagesControlledProps = {
  images: ProductImageForm[]
  // onChange: (images: ProductImageForm[]) => void
  // onRemove: (uri: string) => void
  onChange: (...event: any[]) => void
  errorMessage?: string | null
}
