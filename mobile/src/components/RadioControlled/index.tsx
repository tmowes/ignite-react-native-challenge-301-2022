import { FormControl, HStack, Radio } from 'native-base'

import { RadioControlledProps } from './types'

export function RadioControlled(props: RadioControlledProps) {
  const { options, errorMessage, isInvalid, ...attrs } = props
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} mb="3">
      <Radio.Group defaultValue={options[0].value} isInvalid={invalid} {...attrs}>
        <HStack alignItems="center" justifyContent="space-between" w="full">
          {options.map(({ value, label }) => (
            <Radio value={value} key={label}>
              {label}
            </Radio>
          ))}
        </HStack>
      </Radio.Group>
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
