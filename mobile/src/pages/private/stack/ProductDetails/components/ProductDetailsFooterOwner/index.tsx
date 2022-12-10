import { useLayoutEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Button, HStack, Icon, IconButton, useTheme, VStack } from 'native-base'
import { PencilSimpleLine, Power, TrashSimple } from 'phosphor-react-native'

import { PrivateNavProps } from '@routes/types'

import { ProductDetailsFooterOwnerProps } from './types'

export function ProductDetailsFooterOwner(props: ProductDetailsFooterOwnerProps) {
  const { isActive, isSubmitting, onProductDelete, onProductStatusChange, product_id } = props
  const { colors } = useTheme()
  const { setOptions, navigate } = useNavigation<PrivateNavProps>()

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => navigate('create-product', { id: product_id })}
          icon={
            <Icon
              as={<PencilSimpleLine size={24} color={colors.$gray[700]} weight="regular" />}
            />
          }
        />
      ),
    })
  }, [colors.$gray, navigate, product_id, setOptions])

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      px="8"
      position="absolute"
      bottom={0}
      w="full"
      bg="$gray.100"
      py="2"
    >
      <VStack w="full">
        <Button
          onPress={onProductStatusChange}
          isLoading={isSubmitting}
          variant={isActive ? '$continue' : '$solid'}
          h="10"
          leftIcon={
            <Icon as={<Power size={20} color={colors.$gray[100]} weight="regular" />} />
          }
        >
          {isActive ? 'Desativar anúncio' : 'Reativar anúncio'}
        </Button>
        <Button
          onPress={onProductDelete}
          isLoading={isSubmitting}
          variant="$cancel"
          h="10"
          leftIcon={
            <Icon as={<TrashSimple size={20} color={colors.$gray[700]} weight="regular" />} />
          }
        >
          Excluir anúncio
        </Button>
      </VStack>
    </HStack>
  )
}
