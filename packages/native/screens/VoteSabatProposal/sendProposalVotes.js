import {requestPost} from '../../lib'
import {API} from '../../constants'
import {wait} from '../../lib'

const mockValidResponse = {
  "status": 201,
  "statusMsg": "Created",
  "data": {
    "message": "Hlas(y) byl(y) úspěšně zaznamenán(y)."
  }
}

const mockInvalidResponse = {
  "status": 503,
  "statusMsg": "Service unavailable",
  "data": {
    "message": "Už si volil. Pozdě měnit svá rozhodnutí."
  }
}

const preparePayload = (memberNumber, proposals) => ({
  member_ID: parseInt(memberNumber),
  votes: proposals.map(proposal => ({
    proposal_ID: parseInt(proposal.id),
    value: parseInt(proposal.value)
  }))
})

const validateResponse = (response) => {
  if (response.status > 204) {
    throw new Error(`Invalid status code: ${response.status}`)
  }
}

export const sendProposalVotes = async (memberNumber, token, proposals) => {
  //await wait()
  //return mockValidResponse

  const response = await requestPost({
    url: API.proposalVotes,
    payload: preparePayload(memberNumber, proposals),
    bearerToken: token
  })
  validateResponse(response)

  return response
}
