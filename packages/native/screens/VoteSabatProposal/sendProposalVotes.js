import {requestPost} from '../../lib'
import {API} from '../../constants'

const preparePayload = (memberNumber, proposals) => ({
  member_ID: parseInt(memberNumber),
  votes: proposals.map(proposal => ({
    proposal_ID: parseInt(proposal.id),
    value: parseInt(proposal.value)
  }))
})

export const sendProposalVotes = async (memberNumber, token, proposals) => {
  return requestPost({
    url: API.proposalVotes,
    payload: preparePayload(memberNumber, proposals),
    bearerToken: token
  })
}
