import {fold} from 'fp-ts/lib/Either'
import {pipe} from 'fp-ts/lib/pipeable'
import {requestGet} from '../../../lib'
import {API} from '../../../constants'
import {Proposals} from '../../../types'

const extract = (data: any = []) => data.map((record: any) => ({
  id: record?.ID,
  name: record?.name,
  value: 0
}))

const decode = (response: any): Promise<Proposals> => {
  return new Promise((resolve, reject) => pipe(
    extract(response?.data),
    Proposals.decode,
    fold(
      (errors) => reject(errors),
      (votes) => resolve(votes)
    )
  ))
}

export const fetchProposals = async (sabatId: number, token: string) => {
  return requestGet({
    url: API.sabatsProposals.replace(':id', sabatId.toString()),
    bearerToken: token
  }).then((response) => decode(response))
}
