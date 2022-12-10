import { useState } from 'react'

import {
  Heading,
  ScrollView,
  VStack,
  Text,
  Center,
  Button,
  useToast,
  Skeleton,
  Avatar,
  IconButton,
  useTheme,
  Icon,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, PencilSimpleLine } from 'phosphor-react-native'
import { User } from '@models/user'

import avatarImg from '@assets/userPhotoDefault.png'
import LogoSvg from '@assets/logo.svg'
import { InputControlled } from '@components/InputControlled'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { convertToSlug } from '@utils/converToSlug'
import { validPhotoSize } from '@utils/validPhotoSize'
import { useAuth } from '@contexts/AuthProvider'

import { FormDataProps, signUpSchema } from './schema'

const PHOTO_SIZE = 88

export function SignUp() {
  const { goBack } = useNavigation()
  const { colors } = useTheme()

  const toast = useToast()
  const { onSignIn } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: '',
      email: '',
      tel: '55',
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [omitPassword, setOmitPassword] = useState(true)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState({ uri: '', type: 'image/png' })

  const onAvatarChange = async () => {
    setPhotoIsLoading(true)
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
        setUserPhoto({
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        })
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
    } finally {
      setPhotoIsLoading(false)
    }
  }

  const onSignUp = async (formData: FormDataProps) => {
    try {
      setIsSubmitting(true)
      const photoFile = {
        name: `${convertToSlug(formData.name)}.${userPhoto.type.split('/').pop()}`,
        uri: userPhoto.uri,
        type: userPhoto.type,
      } as any

      const createUserFormData = new FormData()
      createUserFormData.append('avatar', photoFile)
      createUserFormData.append('name', formData.name)
      createUserFormData.append('email', formData.email)
      createUserFormData.append('tel', formData.tel)
      createUserFormData.append('password', formData.password)

      await api.post<User>('/users', createUserFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      await onSignIn(formData.email, formData.password)
    } catch (error) {
      const isAppError = error instanceof AppError
      setIsSubmitting(false)
      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível criar sua conta, tente novamente mais tarde.',
        bgColor: '$red.500',
        placement: 'top',
      })
    }
  }

  return (
    <ScrollView>
      <VStack flex={1}>
        <VStack
          flex={1}
          bg="$gray.200"
          px="12"
          pb="6"
          borderBottomLeftRadius="24"
          borderBottomRightRadius="24"
        >
          <Center my="6">
            <LogoSvg height={48} />
            <Heading color="$gray.600" mb="1" fontSize="xl">
              Boas vindas!
            </Heading>
            <Text color="$gray.500" fontSize="sm" textAlign="center">
              Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
            </Text>
          </Center>
          <Center>
            <Center mb="4" position="relative">
              {photoIsLoading ? (
                <Skeleton
                  w={PHOTO_SIZE}
                  h={PHOTO_SIZE}
                  rounded="full"
                  startColor="$gray.600"
                  endColor="$gray.400"
                />
              ) : (
                <Avatar
                  source={userPhoto.uri ? { uri: userPhoto.uri } : avatarImg}
                  size={PHOTO_SIZE}
                  borderColor="$blue.700"
                  borderWidth={3}
                />
              )}
              <IconButton
                onPress={onAvatarChange}
                h="10"
                w="10"
                rounded="full"
                position="absolute"
                bottom="0"
                right="0"
                mr="-3"
                bg="$blue.700"
                icon={<PencilSimpleLine size={20} color="white" weight="regular" />}
              />
            </Center>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <InputControlled
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputControlled
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoComplete="email"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="tel"
              render={({ field: { onChange, value } }) => (
                <InputControlled
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  autoComplete="off"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.tel?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <InputControlled
                  rightElement={
                    <IconButton
                      onPress={() => setOmitPassword((p) => !p)}
                      ml="4"
                      icon={
                        <Icon
                          as={<Eye size={20} color={colors.$gray['500']} weight="regular" />}
                        />
                      }
                    />
                  }
                  placeholder="Senha"
                  secureTextEntry={omitPassword}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="passwordConfirm"
              render={({ field: { onChange, value } }) => (
                <InputControlled
                  mb="6"
                  rightElement={
                    <IconButton
                      onPress={() => setOmitPassword((p) => !p)}
                      ml="4"
                      icon={
                        <Icon
                          as={<Eye size={20} color={colors.$gray['500']} weight="regular" />}
                        />
                      }
                    />
                  }
                  placeholder="Confirme a Senha"
                  secureTextEntry={omitPassword}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.passwordConfirm?.message}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(onSignUp)}
                />
              )}
            />
            <Button
              variant="$continue"
              isLoading={isSubmitting}
              onPress={handleSubmit(onSignUp)}
            >
              Criar e acessar
            </Button>
          </Center>
        </VStack>
        <Center mt="4" px="12">
          <Text color="$gray.600" fontSize="sm" mb="4">
            Já tem uma conta?
          </Text>
          <Button variant="$cancel" onPress={() => goBack()}>
            Ir para o login
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  )
}
