import {pipe} from 'fp-ts/lib/pipeable'
import {fold} from 'fp-ts/lib/Either'
import {storageGet} from '../lib'
import {Member} from '../types'

const decode = (data: any): Promise<Member> => {
  return new Promise((resolve, reject) => pipe(
    Member.decode({
      token: data?.token,
      number: parseInt(data?.number)
    }),
    fold(
      (errors) => reject(errors),
      (decoded) => resolve(decoded)
    )
  ))
}

export const restoreIdentity = (storageKey: string): Promise<Member> => {
  return new Promise((resolve, reject) => {
    return storageGet(storageKey)
      .then((data: any) => decode(data))
      .then((identity) => resolve(identity))
      .catch(reject)
  })
}
