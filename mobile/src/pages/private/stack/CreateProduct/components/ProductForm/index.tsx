import { Button, Center, Heading, HStack, ScrollView, Text, VStack } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { zodResolver } from '@hookform/resolvers/zod'

import { InputControlled } from '@components/InputControlled'
import { TextAreaControlled } from '@components/TextAreaControlled'
import { SwitchControlled } from '@components/SwitchControlled'
import { PrivateNavProps } from '@routes/types'
import { useUserProducts } from '@contexts/UserProductsProvider'
import { RadioControlled } from '@components/RadioControlled'
import { CheckboxControlled } from '@components/CheckboxControlled'
import { ImagesControlled } from '@components/ImagesControlled'

import { ProductFormProps } from './types'
import { createProductSchema, FormDataInputProps, FormDataOutputProps } from './schema'

export function ProductForm(props: ProductFormProps) {
  const { defaultValues, editingProductId } = props
  const { onCreateUserProductPreview } = useUserProducts()

  const { navigate } = useNavigation<PrivateNavProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataInputProps>({
    defaultValues,
    resolver: zodResolver(createProductSchema),
  })

  const onSubmitPreview = async (data: FormDataOutputProps) => {
    await onCreateUserProductPreview(data)
    navigate('preview-product', { id: editingProductId ?? '' })
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 24 }}
        _contentContainerStyle={{ px: 6 }}
      >
        <Heading fontSize="md" color="$gray.600">
          Imagens
        </Heading>

        <Text fontSize="sm" color="$gray.600">
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>
        <Controller
          control={control}
          name="product_images"
          render={({ field: { onChange, value } }) => (
            <ImagesControlled
              images={value}
              onChange={onChange}
              errorMessage={errors.product_images?.message}
            />
          )}
        />
        <Heading fontSize="md" color="$gray.600" mb="2">
          Sobre o produto
        </Heading>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputControlled
              placeholder="Título do anúncio"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextAreaControlled
              mb="2"
              placeholder="Descrição do produto"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="is_new"
          render={({ field: { onChange, value } }) => (
            <RadioControlled
              name="is_new"
              options={[
                { value: 'is_new', label: 'Produto novo' },
                { value: 'is_used', label: 'Produto usado' },
              ]}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Heading fontSize="md" color="$gray.600" mt="4">
          Venda
        </Heading>
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <InputControlled
              mb="4"
              placeholder="Valor do produto"
              InputLeftElement={
                <Center ml="3" mr="-1" w="8" h="full">
                  <Text textTransform="uppercase" fontSize="lg">
                    R$
                  </Text>
                </Center>
              }
              onChangeText={onChange}
              value={value}
              errorMessage={errors.price?.message}
            />
          )}
        />
        <HStack alignItems="center" space="3" mt="-4">
          <Heading fontSize="md" color="$gray.600" lineHeight="md">
            Aceita troca?
          </Heading>
          <Controller
            control={control}
            name="accept_trade"
            render={({ field: { onChange, value } }) => (
              <SwitchControlled
                m="0"
                mr="auto"
                mt="4"
                w="auto"
                h="10"
                size="lg"
                offThumbColor="$gray.100"
                offTrackColor="$gray.400"
                onThumbColor="$gray.100"
                onTrackColor="$blue.700"
                onToggle={onChange}
                value={value}
                errorMessage={errors.accept_trade?.message}
              />
            )}
          />
        </HStack>
        <Heading fontSize="md" mt="2" color="$gray.600">
          Meios de pagamento aceitos:
        </Heading>
        <VStack space="2">
          <Controller
            control={control}
            name="payment_methods"
            render={({ field: { onChange, value } }) => (
              <CheckboxControlled
                options={[
                  { value: 'boleto', label: 'Boleto' },
                  { value: 'pix', label: 'Pix' },
                  { value: 'cash', label: 'Dinheiro' },
                  { value: 'card', label: 'Cartão de crédito' },
                  { value: 'deposit', label: 'Depósito Bancário' },
                ]}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </VStack>
      </ScrollView>
      <HStack
        position="absolute"
        alignItems="center"
        justifyContent="space-between"
        px="6"
        pt="2"
        pb="4"
        w="full"
        bottom={0}
        bg="$gray.100"
        space={4}
      >
        <Button
          onPress={() => navigate('my-products')}
          variant="$cancel"
          maxW="48%"
          w="1/2"
          h="10"
          m="0"
        >
          Cancelar
        </Button>
        <Button
          onPress={handleSubmit(onSubmitPreview as any)}
          variant="$continue"
          maxW="48%"
          w="1/2"
          h="10"
          m="0"
        >
          Avançar
        </Button>
      </HStack>
    </>
  )
}
