import * as React from 'react'
import styled from 'styled-components'
import {ScrollView} from 'react-native'
import {QuadraticVotingButton} from './QuadraticVotingButton'
import {useIdentity} from '../../context'
import {Button} from '../../components'
import {fetchProposals} from './fetchProposals'
import {sendProposalVotes} from './sendProposalVotes'
import {getItem, setItem} from '../../lib'

export const Container = styled.View`
  flex: 1;
  background-color: ${p => p.theme.screen.background};
`

const Content = styled.View`
  align-items: center;
  width: 100%;
  margin: 0 auto;
`

const StatusText = styled.Text`
  color: white;
  text-align: left;
  margin: 10px;
`

const SubmitButtonContainer = styled.View`
  margin: 10px;
`

const SubmitStatusTest = styled.View`
  align-items: center;
`

const SELECTED_SABAT_ID = 1

const STATUS = {
  loading: 'LOADING',
  error: 'ERROR',
  done: 'DONE'
}

const STATUS_SUBMIT = {
  default: 'DEFAULT',
  sending: 'SENDING',
  alreadySent: 'ALREADY_SENT',
  error: 'ERROR'
}

const getSubmitButtonLabel = (status) => {
  switch (status) {
    case STATUS_SUBMIT.default:
      return 'Odeslat'
    case STATUS_SUBMIT.sending:
      return 'Odesílám'
    case STATUS_SUBMIT.alreadySent:
      return 'Odhlasováno'
    case STATUS_SUBMIT.error:
      return 'Odeslat znovu'
  }
}

const isSubmitButtonDisabled = (status) => status === STATUS_SUBMIT.sending || status === STATUS_SUBMIT.alreadySent

function SubmitButton({status, onPress}) {
  const label = getSubmitButtonLabel(status)
  const disabled = isSubmitButtonDisabled(status)

  return (
    <SubmitButtonContainer>
      <Button
        label={label}
        disabled={disabled}
        onPress={onPress}
      />
      {status === STATUS_SUBMIT.error && (
        <SubmitStatusTest>
          <StatusText>Odeslání se nezdařilo</StatusText>
        </SubmitStatusTest>
      )}
    </SubmitButtonContainer>
  )
}

export default function VoteSabatProposal() {
  const [status, setStatus] = React.useState(STATUS.loading)
  const [statusSubmit, setStatusSubmit] = React.useState(STATUS_SUBMIT.default)
  const [votes, setVotes] = React.useState(210)
  const [proposals, setProposals] = React.useState([])
  const {identity} = useIdentity()

  React.useEffect(() => {
    getItem(`${identity.memberNumber}:sabat:${SELECTED_SABAT_ID}`)
      .then((state) => {
        if (state !== null) {
          setVotes(state.votes)
          setStatusSubmit(STATUS_SUBMIT.alreadySent)
          return state.proposals
        } else {
          return fetchProposals(SELECTED_SABAT_ID, identity.token)
        }
      })
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
      {status === STATUS.loading && <StatusText>načítám...</StatusText>}
      {status === STATUS.error && <StatusText>načítání se nezdařilo</StatusText>}
      {status === STATUS.done &&
      <>
        <StatusText>Zbývajících hlasů: {votes}</StatusText>
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
          <SubmitButton
            status={statusSubmit}
            onPress={() => {
              setStatusSubmit(STATUS_SUBMIT.sending)
              sendProposalVotes(identity.memberNumber, identity.token, proposals)
                .then(response => {
                  console.log('response', response)
                  return setItem(`${identity.memberNumber}:sabat:${SELECTED_SABAT_ID}`, {
                    votes,
                    proposals
                  })
                })
                .then(() => setStatusSubmit(STATUS_SUBMIT.alreadySent))
                .catch(error => {
                  setStatusSubmit(STATUS_SUBMIT.error)
                  console.log('error', error)
                })
            }}
          />
        </ScrollView>
      </>
      }
    </Container>
  )
}
