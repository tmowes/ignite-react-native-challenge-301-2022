import { useState } from 'react'

import {
  ScrollView,
  VStack,
  Text,
  Center,
  Button,
  useToast,
  IconButton,
  useTheme,
  Icon,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye } from 'phosphor-react-native'

import HomeLogoSvg from '@assets/home-logo.svg'
import { PublicNavProps } from '@routes/types'
import { InputControlled } from '@components/InputControlled'
import { AppError } from '@utils/AppError'
import { useAuth } from '@contexts/AuthProvider'

import { FormDataProps, signInSchema } from './schema'

export function SignIn() {
  const { navigate } = useNavigation<PublicNavProps>()
  const { colors } = useTheme()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  })

  const { onSignIn } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [omitPassword, setOmitPassword] = useState(true)

  const handleSignIn = async ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true)
      await onSignIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      setIsLoading(false)
      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível conectar, tente novamente mais tarde.',
        bgColor: 'red.500',
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
          <Center my="24">
            <HomeLogoSvg />
            <Text color="$gray.500" fontSize="sm">
              Seu espaço de compra e venda
            </Text>
          </Center>
          <Center>
            <Text color="$gray.600" mb="4" fontSize="md">
              Acesse sua conta
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputControlled
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <InputControlled
                  mb="6"
                  rightElement={
                    <IconButton
                      ml="4"
                      icon={
                        <Icon
                          as={<Eye size={20} color={colors.$gray['500']} weight="regular" />}
                        />
                      }
                      onPress={() => setOmitPassword((p) => !p)}
                    />
                  }
                  placeholder="Senha"
                  secureTextEntry={omitPassword}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleSignIn)}
                />
              )}
            />
            <Button variant="$solid" onPress={handleSubmit(handleSignIn)} isLoading={isLoading}>
              Entrar
            </Button>
          </Center>
        </VStack>
        <Center mt="12" px="12">
          <Text color="$gray.600" fontSize="sm" mb="4">
            Ainda não tem acesso?
          </Text>
          <Button variant="$cancel" onPress={() => navigate('sign-up')}>
            Criar uma conta
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  )
}
