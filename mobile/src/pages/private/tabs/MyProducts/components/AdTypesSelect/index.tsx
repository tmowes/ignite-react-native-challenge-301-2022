import { HStack, Icon, Select, Text, useTheme } from 'native-base'
import { CaretDown, CaretUp } from 'phosphor-react-native'

import { AdTypesSelectProps } from './types'

export function AdTypesSelect(props: AdTypesSelectProps) {
  const { productsCount, onValueChange, productsTypes, selectedValue } = props
  const { colors } = useTheme()

  return (
    <HStack alignItems="center" justifyContent="space-between" my="4">
      <Text>{productsCount}</Text>
      <Select
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        minW="2/5"
        h="8"
        bg="$gray.100"
        position="relative"
        borderColor="$gray.300"
        borderWidth="1"
        alignItems="center"
        color="$gray.700"
        dropdownOpenIcon={
          <Icon as={<CaretUp size={18} color={colors.$gray['500']} />} mx="2" />
        }
        dropdownCloseIcon={
          <Icon as={<CaretDown size={18} color={colors.$gray['500']} />} mx="2" />
        }
        _actionSheetContent={{
          bg: 'transparent',
          shadow: 'none',
          w: '35%',
          p: '0',
          ml: 'auto',
          mr: '6',
          h: '86%',
          rounded: '24',
          _dragIndicator: {
            h: '0',
            w: '0',
          },
        }}
        _selectedItem={{
          _text: {
            fontWeight: 'bold',
            lineHeight: 'xl',
            color: '$gray.700',
          },
        }}
        _item={{
          bg: '$gray.200',
          borderRadius: 'md',
          h: '8',
          py: '0',
          px: '4',
          mb: '0.5',
          shadow: '1',
          _text: {
            color: '$gray.600',
            lineHeight: 'xl',
          },
          _pressed: {
            bg: '$gray.300',
          },
        }}
      >
        {productsTypes.map(({ label, value }) => (
          <Select.Item key={value} label={label} value={value} />
        ))}
      </Select>
    </HStack>
  )
}
