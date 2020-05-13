import {AsyncStorage} from 'react-native'

export const storageGet = async <A=object>(key: string): Promise<A|null> => {
  const value = await AsyncStorage.getItem(key)

  if (value !== null) {
    return JSON.parse(value)
  }
  return value
}

export const storageSet = (key: string, value: object) => {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

export const clear = () => AsyncStorage.clear()
