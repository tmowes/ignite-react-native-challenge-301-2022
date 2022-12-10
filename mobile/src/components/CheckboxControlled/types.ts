import { ICheckboxGroupProps } from 'native-base'

export type CheckboxControlledProps = ICheckboxGroupProps & {
  errorMessage?: string | null
  options: {
    label: string
    value: string
  }[]
}
