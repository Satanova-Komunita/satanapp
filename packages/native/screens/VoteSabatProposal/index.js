import * as React from 'react'
import styled from 'styled-components'
import {ScrollView} from 'react-native'
import {QuadraticVotingButton} from './QuadraticVotingButton'
import {useIdentity} from '../../context'
import {Button} from '../../components'
import {fetchProposals} from './fetchProposals'
import {sendProposalVotes} from './sendProposalVotes'

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

const ButtonContainer = styled.View`
  margin: 10px;
`

const STATUS = {
  loading: 'LOADING',
  error: 'ERROR',
  done: 'DONE'
}

export default function VoteSabatProposal() {
  const [status, setStatus] = React.useState(STATUS.loading)
  const [votes, setVotes] = React.useState(100)
  const [proposals, setProposals] = React.useState([])
  const {identity} = useIdentity()

  React.useEffect(() => {
    fetchProposals(1, identity.token)
      .then(proposals => {
        setProposals([...proposals])
        setStatus(STATUS.done)
      })
      .catch(error => {
        console.log(error)
        setStatus(STATUS.error)
      })
  }, [])

  return (
    <Container>
      {status === STATUS.loading && <VotesStatus>načítám...</VotesStatus>}
      {status === STATUS.error && <VotesStatus>načítání se nezdařilo</VotesStatus>}
      {status === STATUS.done &&
        <>
          <VotesStatus>Zbývajících hlasů: {votes}</VotesStatus>
          <ScrollView>
            <Content>
              {
                proposals.map(proposal => <QuadraticVotingButton
                  key={proposal.id}
                  votes={votes}
                  value={proposal.value}
                  text={proposal.text}
                  handleOnChange={({newVotes, newProposalValue}) => {
                    setVotes(newVotes)
                    setProposals(proposals.map(newProposal => newProposal.id !== proposal.id ? newProposal : ({
                      ...newProposal,
                      value: newProposalValue
                    })))
                  }}
                />)
              }
            </Content>
            <ButtonContainer>
              <Button
                label='Odeslat'
                disabled={false}
                onPress={() => {
                  sendProposalVotes(identity.memberNumber, identity.token, proposals)
                    .then(response => {
                      console.log('response', response)
                    }).catch(error => {
                      console.error('error', error)
                    })
                }}
              />
            </ButtonContainer>
          </ScrollView>
        </>
      }
    </Container>
  )
}
