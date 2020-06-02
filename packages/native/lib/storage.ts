import {AsyncStorage} from 'react-native'

export const storageGet = <A=object>(key: string): Promise<A|null> => {
  return AsyncStorage.getItem(key).then((value) => JSON.parse(String(value)))
}

export const storageSet = (key: string, value: object) => {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

export const removeItem = (key: string) => AsyncStorage.removeItem(key)

export const storageClear = () => AsyncStorage
  .getAllKeys()
  .then((keys) => keys.filter((key) => key !== 'identity:last'))
  .then((keys) => AsyncStorage.multiRemove(keys))
