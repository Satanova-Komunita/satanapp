import * as React from 'react'
import {FlatList} from 'react-native'
import styled from 'styled-components/native'
import {useIdentity} from '../../context'
import {storageGet, storageSet} from '../../lib'
import {QuadraticVotingButton} from './quadratic-voting-button'
import {SubmitButton} from './submit-button'
import {fetchProposals, sendProposalVotes} from './requests'
import {STATUS} from './constants'

const Container = styled.View`
  flex: 1;
  background-color: ${p => p.theme.screen.background};
`

const StatusText = styled.Text`
  color: white;
  text-align: left;
  margin: 10px;
`

const SELECTED_SABAT_ID = 1

export const VoteSabatProposal: React.FunctionComponent = () => {
  const [statusData, setStatusData] = React.useState(STATUS.loading)
  const [statusSubmit, setStatusSubmit] = React.useState(STATUS.default)
  const [votes, setVotes] = React.useState(210)
  const [proposals, setProposals] = React.useState<Array<any>>([])
  const {identity} = useIdentity()

  React.useEffect(() => {
    storageGet(`${identity.memberNumber}:sabat:${SELECTED_SABAT_ID}`)
      .then((state: any) => {
        if (state !== null) {
          setVotes(state.votes)
          setStatusSubmit(STATUS.done)
          return state.proposals
        } else {
          return fetchProposals(SELECTED_SABAT_ID, identity.token)
        }
      })
      .then((proposals) => {
        setProposals([...proposals])
        setStatusData(STATUS.done)
      })
      .catch(error => {
        console.log(error)
        setStatusData(STATUS.error)
      })
  }, [])

  return (
    <Container>
      {statusData === STATUS.loading && <StatusText>načítám...</StatusText>}
      {statusData === STATUS.error && <StatusText>načítání se nezdařilo</StatusText>}
      {statusData === STATUS.done &&
      <>
        <StatusText>Zbývajících hlasů: {votes}</StatusText>
          <FlatList
            data={proposals}
            renderItem={({item}) => <QuadraticVotingButton
                key={item.id}
                votes={votes}
                value={item.value}
                text={item.text}
                handleOnChange={({newVotes, newProposalValue}: any) => {
                  setVotes(newVotes)
                  setProposals(proposals.map(newProposal => newProposal.id !== item.id ? newProposal : ({
                    ...newProposal,
                    value: newProposalValue
                  })))
                }}
              />
            }
          />
          <SubmitButton
            status={statusSubmit}
            onPress={() => {
              setStatusSubmit(STATUS.loading)
              sendProposalVotes(identity.memberNumber, identity.token, proposals)
                .then(() => {
                  return storageSet(`${identity.memberNumber}:sabat:${SELECTED_SABAT_ID}`, {
                    votes,
                    proposals
                  })
                })
                .then(() => setStatusSubmit(STATUS.done))
                .catch(error => {
                  setStatusSubmit(STATUS.error)
                  console.log('error', error)
                })
            }}
          />
      </>
      }
    </Container>
  )
}
