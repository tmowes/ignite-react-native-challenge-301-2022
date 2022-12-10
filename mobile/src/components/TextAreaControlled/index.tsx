import { FormControl, TextArea } from 'native-base'

import { TextAreaControlledProps } from './types'

export function TextAreaControlled(props: TextAreaControlledProps) {
  const { errorMessage, isInvalid, ...attrs } = props
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} mb="3">
      <TextArea isInvalid={invalid} autoCompleteType="" totalLines={6} {...attrs} />
      <FormControl.ErrorMessage
        _text={{
          color: '$red.500',
          mt: '-2',
          ml: '2',
        }}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
