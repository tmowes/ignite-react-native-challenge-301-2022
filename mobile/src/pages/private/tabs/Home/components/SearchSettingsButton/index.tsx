import { Divider, HStack, Icon, IconButton, useTheme } from 'native-base'
import { MagnifyingGlass, Sliders, X } from 'phosphor-react-native'

import { SearchSettingsButtonProps } from './types'

export function SearchSettingsButton(props: SearchSettingsButtonProps) {
  const { onSearchPress, onFilterPress, hasContent, onSearchReset } = props
  const { colors } = useTheme()
  return (
    <HStack h="100%" py="3" alignItems="center" justifyContent="space-between">
      {hasContent && (
        <>
          <IconButton
            onPress={onSearchReset}
            icon={
              <Icon pr="8" as={<X size={20} color={colors.$gray['700']} weight="regular" />} />
            }
          />
          <Divider orientation="vertical" bg="$gray.300" />
        </>
      )}
      <IconButton
        onPress={onSearchPress}
        icon={
          <Icon
            px="3"
            as={<MagnifyingGlass size={20} color={colors.$gray['700']} weight="regular" />}
          />
        }
      />
      <Divider orientation="vertical" bg="$gray.300" />
      <IconButton
        onPress={onFilterPress}
        icon={
          <Icon
            px="3"
            as={<Sliders size={20} color={colors.$gray['700']} weight="regular" />}
          />
        }
      />
    </HStack>
  )
}
