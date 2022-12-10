import { FormControl, Switch } from 'native-base'

import { SwitchControlledProps } from './types'

export function SwitchControlled(props: SwitchControlledProps) {
  const { errorMessage, isInvalid, ...attrs } = props
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} mb="3">
      <Switch isInvalid={invalid} {...attrs} />
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
