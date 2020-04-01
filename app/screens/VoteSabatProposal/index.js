import * as React from 'react'
import styled from 'styled-components'
import {QuadraticVotingButton} from './QuadraticVotingButton'

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

export default function VoteSabatProposal() {
  const [votes, setVotes] = React.useState(100)
  const [proposals, setProposals] = React.useState([
    {
      id: 1,
      value: 0,
      text: 'Konzerva pro každého hladového afričana'
    },
    {
      id: 2,
      value: 0,
      text: 'Deka pro každého bezdomovce'
    },
    {
      id: 3,
      value: 0,
      text: 'Legalizace heroinu'
    }
  ])

  return (
    <Container>
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
              setProposals([...proposals].map(newProposal => newProposal.id !== proposal.id ? ({...newProposal}) : ({
                ...newProposal,
                value: newProposalValue
              })))
            }}
          />)
        }
      </Content>
    </Container>
  )
}
