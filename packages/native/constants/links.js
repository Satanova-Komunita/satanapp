const API_BASE_URL = 'https://satanovakomunita.cz/api'

export const API = {
  login: `${API_BASE_URL}/login`,
  sabatsProposals: `${API_BASE_URL}/sabats/:id/proposals`,
  proposalVotes: `${API_BASE_URL}/proposal-votes`
}
