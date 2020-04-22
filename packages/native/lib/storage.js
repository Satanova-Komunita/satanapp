import {AsyncStorage} from 'react-native'

export const getItem = async (key) => {
  const value = await AsyncStorage.getItem(key)

  if (value !== null) {
    return JSON.parse(value)
  }
  return value
}

export const setItem = (key, value) => {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

export const clear = () => AsyncStorage.clear()
