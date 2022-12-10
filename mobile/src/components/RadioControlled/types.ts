import { IRadioGroupProps, IRadioProps } from 'native-base'

export type RadioControlledProps = IRadioGroupProps & {
  errorMessage?: string | null
  options: {
    label: string
    value: string
  }[]
}
