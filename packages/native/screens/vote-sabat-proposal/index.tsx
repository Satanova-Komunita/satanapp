import * as React from 'react'
import {FlatList} from 'react-native'
import styled from 'styled-components/native'
import {useIdentity} from '../../context'
import {storageGet, storageSet} from '../../lib'
import {QuadraticVotingButton} from './quadratic-voting-button'
import {SubmitButton} from './submit-button'
import {fetchProposals, sendProposalVotes} from './requests'
import {STATUS} from './constants'
import {Proposal} from '../../types'
import {Either, left, right, fold} from 'fp-ts/lib/Either'
import {useVoteSabatState, LoadProposalsFromCache, LoadProposalsFromNetwork} from './use-vote-sabat-state'

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

type LoadFromCacheOrNetwork = Either<LoadProposalsFromCache, LoadProposalsFromNetwork>

const initProposals = async (memberNumber: number, token: string): Promise<LoadFromCacheOrNetwork> => {
  const data: any = await storageGet(`${memberNumber}:sabat:${SELECTED_SABAT_ID}`)
  if (data !== null) {
    return left({
      votes: data.votes,
      proposals: data.proposals
    })
  }

  const proposals = await fetchProposals(SELECTED_SABAT_ID, token)
  return right({
    proposals: proposals
  })
}

export const VoteSabatProposal: React.FunctionComponent = () => {
  const {identity} = useIdentity()
  const {
    state,
    loadProposalsFromCache,
    loadProposalsFromNetwork,
    loadProposalsFailed,
    vote,
    submitVotes,
    submitVotesDone,
    submitVotesFailed
  } = useVoteSabatState()

  React.useEffect(() => {
    initProposals(identity.number, identity.token)
      .then(fold(
        (payload) => loadProposalsFromCache(payload),
        (payload) => loadProposalsFromNetwork(payload)
      )).catch((error) => {
        console.log(error)
        loadProposalsFailed()
      })
  }, [])

  return (
    <Container>
      {state.statusData === STATUS.loading && <StatusText>načítám...</StatusText>}
      {state.statusData === STATUS.error && <StatusText>načítání se nezdařilo</StatusText>}
      {state.statusData === STATUS.done &&
      <>
        <StatusText>Zbývajících hlasů: {state.votes}</StatusText>
        <FlatList<Proposal>
          data={state.proposals}
          renderItem={({item}) => <QuadraticVotingButton
            key={item.id}
            votes={state.votes}
            value={item.value}
            name={item.name}
            handleOnChange={({newVotes, newProposalValue}) => {
              vote({
                votes: newVotes,
                votedProposalId: item.id,
                votedProposalValue: newProposalValue
              })
            }}
          />
          }
        />
        <SubmitButton
          status={state.statusSubmit}
          onPress={() => {
            submitVotes()
            sendProposalVotes(identity.number, identity.token, state.proposals)
              .then(() => storageSet(`${identity.number}:sabat:${SELECTED_SABAT_ID}`, {
                votes: state.votes,
                proposals: state.proposals
              }))
              .then(() => submitVotesDone())
              .catch(error => {
                console.log('error', error)
                submitVotesFailed()
              })
          }}
        />
      </>
      }
    </Container>
  )
}
