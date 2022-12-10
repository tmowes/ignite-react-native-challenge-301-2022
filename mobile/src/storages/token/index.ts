import AsyncStorage from '@react-native-async-storage/async-storage'
import { TOKEN_STORAGE_KEY } from '@storages/storageConfig'

export const saveTokenStorage = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export const getTokenStorage = async () => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
  return token || null
}

export const removeTokenStorage = async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
}
