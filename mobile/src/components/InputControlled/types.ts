import { IInputProps } from 'native-base'

export type InputControlledProps = IInputProps & {
  errorMessage?: string | null
}
