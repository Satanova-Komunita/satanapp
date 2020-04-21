import {requestGet} from '../../lib'
import {API} from '../../constants'

const validateResponse = (response) => {
  if (typeof response !== 'object') {
    throw new Error('Response must be an object')
  }

  if (!Array.isArray(response.data)) {
    throw new Error('Data must be an array')
  }
}

const parseProposals = (data) => data.map(record => ({
  id: record.ID,
  text: record.description,
  value: 0
}))

export const fetchProposals = async (sabatId, token) => {
  const response = await requestGet({
    url: API.sabatsProposals.replace(':id', sabatId),
    bearerToken: token
  })
  validateResponse(response)

  return parseProposals(response.data)
}
