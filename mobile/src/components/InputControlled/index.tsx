import { FormControl, Input } from 'native-base'

import { InputControlledProps } from './types'

export function InputControlled(props: InputControlledProps) {
  const { errorMessage, isInvalid, ...attrs } = props
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} mb="3">
      <Input isInvalid={invalid} {...attrs} />
      <FormControl.ErrorMessage
        _text={{
          color: '$red.500',
          mt: '-3',
          ml: '2',
        }}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
