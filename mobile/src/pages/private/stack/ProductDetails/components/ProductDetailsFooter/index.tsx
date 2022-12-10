import { Linking } from 'react-native'

import { Button, Heading, HStack, Icon, useTheme } from 'native-base'
import { WhatsappLogo } from 'phosphor-react-native'

import { ProductDetailsFooterProps } from './types'

export function ProductDetailsFooter(props: ProductDetailsFooterProps) {
  const { priceFormatted, contact } = props
  const { colors } = useTheme()

  const onWhatsappContact = async () => {
    await Linking.openURL(`https://wa.me/${contact}`)
  }

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      px="6"
      position="absolute"
      bottom={0}
      w="full"
      bg="$gray.100"
      py="2"
    >
      <Heading fontSize="2xl" color="$blue.500">
        <Heading fontSize="sm" color="$blue.500" lineHeight="2xl">
          R${' '}
        </Heading>
        {priceFormatted}
      </Heading>
      <Button
        onPress={onWhatsappContact}
        variant="$solid"
        isDisabled={!contact}
        w="auto"
        px="2"
        h="10"
        leftIcon={
          <Icon as={<WhatsappLogo size={20} color={colors.$gray[100]} weight="fill" />} />
        }
      >
        Entrar em contato
      </Button>
    </HStack>
  )
}
