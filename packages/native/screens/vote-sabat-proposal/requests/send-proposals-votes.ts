import {requestPost} from '../../../lib'
import {API} from '../../../constants'

const preparePayload = (memberNumber: number, proposals: Array<any>) => ({
  member_ID: memberNumber,
  votes: proposals.map(proposal => ({
    proposal_ID: proposal.id,
    value: proposal.value
  }))
})

const validateResponse = (response: any) => {
  if (response.status > 204) {
    throw new Error(`Invalid status code: ${response.data.message}`)
  }
}

export const sendProposalVotes = async (memberNumber: number, token: string, proposals: Array<any>) => {
  const response = await requestPost({
    url: API.proposalVotes,
    payload: preparePayload(memberNumber, proposals),
    bearerToken: token
  })
  validateResponse(response)

  return response
}
