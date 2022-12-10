import { FormControl, Checkbox } from 'native-base'

import { CheckboxControlledProps } from './types'

export function CheckboxControlled(props: CheckboxControlledProps) {
  const { options, errorMessage, ...attrs } = props
  const invalid = !!errorMessage
  return (
    <FormControl isInvalid={invalid} mb="3">
      <Checkbox.Group colorScheme="muted" {...attrs}>
        {options.map(({ value, label }) => (
          <Checkbox value={value} key={label}>
            {label}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <FormControl.ErrorMessage _text={{ color: '$red.500', mt: '-2', ml: '2' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
