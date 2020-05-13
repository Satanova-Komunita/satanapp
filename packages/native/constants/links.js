import {config} from '../lib'

const API_BASE_URL = `${config().api.url}/api`

export const API = {
  login: `${API_BASE_URL}/login`,
  sabatsProposals: `${API_BASE_URL}/sabats/:id/proposals`,
  proposalVotes: `${API_BASE_URL}/proposal-votes`
}
