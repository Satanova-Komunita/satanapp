import {fold} from 'fp-ts/lib/Either'
import {pipe} from 'fp-ts/lib/pipeable'
import {requestPost} from '../../lib'
import {API} from '../../constants'
import {Member} from '../../types'

const decode = (response: any): Promise<Member> => {
  return new Promise((resolve, reject) => pipe(
    Member.decode({
      token: response?.data?.JWT,
      number: parseInt(response?.data?.userData?.member_number)
    }),
    fold(
      (errors) => reject(errors),
      (decoded) => resolve(decoded)
    )
  ))
}

export const sendLoginRequest = (id: string) => {
  return requestPost({
    url: API.login,
    payload: {
      member_number: id
    }
  }).then(response => decode(response))
}
