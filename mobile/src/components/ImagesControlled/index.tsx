/* eslint-disable sonarjs/no-use-of-empty-return-value */
/* eslint-disable sonarjs/no-identical-expressions */
import { useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import {
  AspectRatio,
  Center,
  FormControl,
  HStack,
  IconButton,
  Image,
  useTheme,
  useToast,
  View,
} from 'native-base'
import { Plus, X } from 'phosphor-react-native'

import { validPhotoSize } from '@utils/validPhotoSize'
import { AppError } from '@utils/AppError'
import { convertToSlug } from '@utils/converToSlug'

import { ImagesControlledProps } from './types'

const PHOTO_SIZE = (Dimensions.get('window').width * 0.84) / 3

export function ImagesControlled(props: ImagesControlledProps) {
  const { images: productImages, onChange, errorMessage } = props
  const toast = useToast()
  const { colors } = useTheme()

  const invalid = !!errorMessage

  const onProductImageChange = async (index: number) => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        if (photoInfo.size && validPhotoSize(photoInfo.size, 2)) {
          toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 2MB.',
            placement: 'top',
            bgColor: '$red.500',
          })
          return
        }
        const fileExtension = photoInfo.uri.split('.').pop()
        const newProductImage = {
          name: `${convertToSlug(String(index))}.${fileExtension}`,
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        }

        onChange([...productImages, newProductImage])
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível sua foto de perfil, tente novamente mais tarde.',
        bgColor: 'red.500',
        placement: 'top',
      })
    }
  }

  const onRemoveProductImage = (uri?: string) => {
    if (!uri) return
    onChange(productImages.filter((image) => image?.uri !== uri))
  }

  return (
    <FormControl isInvalid={invalid} mb="4">
      <HStack justifyContent="space-between" w="full" mt="4">
        <TouchableOpacity
          onPress={() => onProductImageChange(0)}
          style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
        >
          <AspectRatio ratio={1 / 1} borderRadius="md" overflow="hidden">
            {productImages[0]?.uri ? (
              <Center position="relative">
                <Image source={{ uri: productImages[0]?.uri }} size={PHOTO_SIZE} alt="" />
                <IconButton
                  onPress={() => onRemoveProductImage(productImages[0]?.uri)}
                  h="4"
                  w="4"
                  rounded="full"
                  position="absolute"
                  top="1"
                  right="1"
                  bg="$gray.700"
                  icon={<X size={12} color="white" weight="regular" />}
                />
              </Center>
            ) : (
              <Center w="full" h="full" bg="$gray.300">
                <Plus size={24} color={colors.$gray['400']} weight="regular" />
              </Center>
            )}
          </AspectRatio>
        </TouchableOpacity>
        {productImages.length > 0 && (
          <>
            <TouchableOpacity
              onPress={() => onProductImageChange(1)}
              style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
            >
              <AspectRatio ratio={1 / 1} borderRadius="md" overflow="hidden">
                {productImages[1]?.uri ? (
                  <Center position="relative">
                    <Image source={{ uri: productImages[1].uri }} size={PHOTO_SIZE} alt="" />
                    <IconButton
                      onPress={() => onRemoveProductImage(productImages[1]?.uri)}
                      h="4"
                      w="4"
                      rounded="full"
                      position="absolute"
                      top="1"
                      right="1"
                      bg="$gray.700"
                      icon={<X size={12} color="white" weight="regular" />}
                    />
                  </Center>
                ) : (
                  <Center w="full" h="full" bg="$gray.300">
                    <Plus size={24} color={colors.$gray['400']} weight="regular" />
                  </Center>
                )}
              </AspectRatio>
            </TouchableOpacity>
            {!productImages[1]?.uri && (
              <View style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }} />
            )}
          </>
        )}
        {productImages.length > 1 && (
          <TouchableOpacity
            onPress={() => onProductImageChange(2)}
            style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
          >
            <AspectRatio ratio={1 / 1} borderRadius="md" overflow="hidden">
              {productImages[2]?.uri ? (
                <Center position="relative">
                  <Image source={{ uri: productImages[2]?.uri }} size={PHOTO_SIZE} alt="" />
                  <IconButton
                    onPress={() => onRemoveProductImage(productImages[2]?.uri)}
                    h="4"
                    w="4"
                    rounded="full"
                    position="absolute"
                    top="1"
                    right="1"
                    bg="$gray.700"
                    icon={<X size={12} color="white" weight="regular" />}
                  />
                </Center>
              ) : (
                <Center w="full" h="full" bg="$gray.300">
                  <Plus size={24} color={colors.$gray['400']} weight="regular" />
                </Center>
              )}
            </AspectRatio>
          </TouchableOpacity>
        )}
      </HStack>
      <FormControl.ErrorMessage _text={{ color: '$red.500', mt: '-2', ml: '2' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
