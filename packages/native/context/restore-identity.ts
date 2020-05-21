import {storageGet} from '../lib'
import {UserIdentity} from './types'

const validate = (data: any) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid datatype')
  }
  if (typeof data.token !== 'string') {
    throw new Error('Invalid datatype of token')
  }
  if (typeof data.memberNumber !== 'number') {
    throw new Error('Invalid datatype of memberNumber')
  }

  return data
}

const parse = (data: any): UserIdentity => ({
  token: data.token,
  memberNumber: data.memberNumber
})

export const restoreIdentity = (storageKey: string): Promise<UserIdentity> => {
  return new Promise((resolve, reject) => {
    return storageGet(storageKey)
      .then((data: any) => validate(data))
      .then((data: any) => parse(data))
      .then((identity) => resolve(identity))
      .catch(reject)
  })
}
