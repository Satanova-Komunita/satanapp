import * as React from 'react'
import styled from 'styled-components'
import {QuadraticVotingButton} from './QuadraticVotingButton'
import {requestGet} from '../../lib'
import {API} from '../../constants'
import {useIdentity} from '../../context'

export const Container = styled.View`
  flex: 1;
  background-color: ${p => p.theme.screen.background};
`

const Content = styled.View`
  align-items: center;
  width: 100%;
  margin: 0 auto;
`

const VotesStatus = styled.Text`
  color: white;
  text-align: left;
  margin: 10px;
`

const STATUS = {
  loading: 'LOADING',
  error: 'ERROR',
  done: 'DONE'
}

const fetchProposals = (sabatId, token) => requestGet({
  url: API.sabatsProposals.replace(':id', sabatId),
  bearerToken: token
})

const validateResponse = (response) => {
  if (typeof response !== 'object') {
    throw new Error('Response must be an object')
  }

  if (!Array.isArray(response.data)) {
    throw new Error('Data must be an array')
  }

  return response
}

const parseProposals = (data) => data.map(record => ({
  id: record.ID,
  text: record.description,
  value: 0
}))

export default function VoteSabatProposal() {
  const [status, setStatus] = React.useState(STATUS.loading)
  const [votes, setVotes] = React.useState(100)
  const [proposals, setProposals] = React.useState([])
  const {identity} = useIdentity()

  React.useEffect(() => {
    fetchProposals(1, identity.token)
      .then(response => validateResponse(response))
      .then(response => parseProposals(response.data))
      .then(proposals => {
        setProposals(proposals)
        setStatus(STATUS.done)
      })
      .catch(error => {
        console.log(error)
        setStatus(STATUS.error)
      })
  }, [])

  return (
    <Container>
      {status === 'LOADING' && <VotesStatus>načítám...</VotesStatus>}
      {status === 'ERROR' && <VotesStatus>načítání se nezdařilo</VotesStatus>}
      {status === 'DONE' &&
        <>
          <VotesStatus>Zbývajících hlasů: {votes}</VotesStatus>
          <Content>
            {
              proposals.map(proposal => <QuadraticVotingButton
                key={proposal.id}
                votes={votes}
                value={proposal.value}
                text={proposal.text}
                handleOnChange={({newVotes, newProposalValue}) => {
                  setVotes(newVotes)
                  setProposals(proposals.map(newProposal => newProposal.id !== proposal.id ? ({...newProposal}) : ({
                    ...newProposal,
                    value: newProposalValue
                  })))
                }}
              />)
            }
          </Content>
        </>
      }
    </Container>
  )
}
