import { ITextAreaProps } from 'native-base'

export type TextAreaControlledProps = ITextAreaProps & {
  errorMessage?: string | null
}
