import { User } from '@models/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_STORAGE_KEY } from '@storages/storageConfig'

export const saveUserStorage = async (user: User) => {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export const getUserStorage = async () => {
  const user = await AsyncStorage.getItem(USER_STORAGE_KEY)
  return user ? JSON.parse(user) : null
}

export const removeUserStorage = async () => {
  await AsyncStorage.removeItem(USER_STORAGE_KEY)
}
