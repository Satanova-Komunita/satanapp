import * as React from 'react'
import {FlatList} from 'react-native'
import styled from 'styled-components/native'
import {useIdentity} from '../../context'
import {storageGet, storageSet} from '../../lib'
import {QuadraticVotingButton} from './quadratic-voting-button'
import {SubmitButton} from './submit-button'
import {fetchProposals, sendProposalVotes} from './requests'
import {STATUS} from './constants'
import {Proposal, Proposals} from '../../types'
import {Either, left, right, fold} from 'fp-ts/lib/Either'

const Container = styled.View`
  flex: 1;
  background-color: ${p => p.theme.screen.background};
`

const StatusText = styled.Text`
  color: white;
  text-align: left;
  margin: 10px;
`

interface State {
  statusData: any,
  statusSubmit: any,
  votes: number,
  proposals: Proposals
}

type LoadProposalsFromCache = {
  votes: number,
  proposals: Proposals
}

type LoadProposalsFromNetwork = {
  proposals: Proposals
}

type VotePayload = {
  votes: number,
  votedProposalId: any,
  votedProposalValue: number
}

type Action =
  | { type: 'LOAD_PROPOSALS_FROM_CACHE', payload: LoadProposalsFromCache }
  | { type: 'LOAD_PROPOSALS_FROM_NETWORK', payload: LoadProposalsFromNetwork }
  | { type: 'LOAD_PROPOSALS_FAILED' }
  | { type: 'VOTE', payload: VotePayload }
  | { type: 'SUBMIT_VOTES' }
  | { type: 'SUBMIT_VOTES_DONE' }
  | { type: 'SUBMIT_VOTES_FAILED' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_PROPOSALS_FROM_CACHE':
      return {
        ...action.payload,
        statusSubmit: STATUS.done,
        statusData: STATUS.done
      }
    case 'LOAD_PROPOSALS_FROM_NETWORK':
      return {
        ...action.payload,
        votes: state.votes,
        statusData: STATUS.done,
        statusSubmit: state.statusSubmit
      }
    case 'LOAD_PROPOSALS_FAILED':
      return {
        ...state,
        statusData: STATUS.error
      }
    case 'VOTE':
      return {
        statusData: state.statusData,
        statusSubmit: state.statusSubmit,
        votes: action.payload.votes,
        proposals: state.proposals.map((proposal) => {
          return (proposal.id !== action.payload.votedProposalId) ? proposal : {
            ...proposal,
            value: action.payload.votedProposalValue
          }
        })
      }
    case 'SUBMIT_VOTES':
      return {
        ...state,
        statusSubmit: STATUS.loading
      }
    case 'SUBMIT_VOTES_DONE':
      return {
        ...state,
        statusSubmit: STATUS.done
      }
    case 'SUBMIT_VOTES_FAILED':
      return {
        ...state,
        statusSubmit: STATUS.error
      }
  }
}

const SELECTED_SABAT_ID = 1

const initProposals = async (memberNumber: number, token: string): Promise<Either<LoadProposalsFromCache, LoadProposalsFromNetwork>> => {
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
  const [state, dispatch] = React.useReducer(reducer, {
    statusData: STATUS.loading,
    statusSubmit: STATUS.default,
    votes: 210,
    proposals: []
  })

  React.useEffect(() => {
    initProposals(identity.number, identity.token)
      .then(fold(
        (payload) => dispatch({type: 'LOAD_PROPOSALS_FROM_CACHE', payload}),
        (payload) => dispatch({type: 'LOAD_PROPOSALS_FROM_NETWORK', payload})
      )).catch((error) => {
        console.log(error)
        dispatch({type: 'LOAD_PROPOSALS_FAILED'})
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
            handleOnChange={({newVotes, newProposalValue}: any) => {
              dispatch({
                type: 'VOTE', payload: {
                  votes: newVotes,
                  votedProposalId: item.id,
                  votedProposalValue: newProposalValue
                }
              })
            }}
          />
          }
        />
        <SubmitButton
          status={state.statusSubmit}
          onPress={() => {
            dispatch({type: 'SUBMIT_VOTES'})
            sendProposalVotes(identity.number, identity.token, state.proposals)
              .then(() => storageSet(`${identity.number}:sabat:${SELECTED_SABAT_ID}`, {
                votes: state.votes,
                proposals: state.proposals
              }))
              .then(() => dispatch({type: 'SUBMIT_VOTES_DONE'}))
              .catch(error => {
                console.log('error', error)
                dispatch({type: 'SUBMIT_VOTES_FAILED'})
              })
          }}
        />
      </>
      }
    </Container>
  )
}
