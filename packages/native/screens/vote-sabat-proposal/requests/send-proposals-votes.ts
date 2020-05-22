import {requestPost} from '../../../lib'
import {API} from '../../../constants'
import {Proposals} from '../../../types'

const preparePayload = (memberNumber: number, proposals: Proposals) => ({
  member_ID: memberNumber,
  votes: proposals.map((proposal) => ({
    proposal_ID: proposal.id,
    value: proposal.value
  }))
})

const validateResponse = (response: any) => {
  if (parseInt(response?.status) > 204) {
    throw new Error(`Invalid status code. Message is: ${response?.data?.message}`)
  }

  return response
}

export const sendProposalVotes = async (memberNumber: number, token: string, proposals: Proposals) => {
  return requestPost({
    url: API.proposalVotes,
    payload: preparePayload(memberNumber, proposals),
    bearerToken: token
  }).then((response) => validateResponse(response))
}
