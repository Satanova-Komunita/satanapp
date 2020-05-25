import * as React from 'react'
import {STATUS} from './constants'
import {Proposals} from '../../types'

interface State {
  statusData: any,
  statusSubmit: any,
  votes: number,
  proposals: Proposals
}

export type LoadProposalsFromCache = {
  votes: number,
  proposals: Proposals
}

export type LoadProposalsFromNetwork = {
  proposals: Proposals
}

type VotePayload = {
  votes: number,
  votedProposalId: string,
  votedProposalValue: number
}

type Action =
  | {type: 'LOAD_PROPOSALS_FROM_CACHE', payload: LoadProposalsFromCache}
  | {type: 'LOAD_PROPOSALS_FROM_NETWORK', payload: LoadProposalsFromNetwork}
  | {type: 'LOAD_PROPOSALS_FAILED'}
  | {type: 'VOTE', payload: VotePayload}
  | {type: 'SUBMIT_VOTES'}
  | {type: 'SUBMIT_VOTES_DONE'}
  | {type: 'SUBMIT_VOTES_FAILED'}

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

export const useVoteSabatState = () => {
  const [currentState, dispatch] = React.useReducer(reducer, {
    statusData: STATUS.loading,
    statusSubmit: STATUS.default,
    votes: 210,
    proposals: []
  })

  const state: State = currentState
  const loadProposalsFromCache = (payload: LoadProposalsFromCache) => dispatch({type: 'LOAD_PROPOSALS_FROM_CACHE', payload})
  const loadProposalsFromNetwork = (payload: LoadProposalsFromNetwork) => dispatch({type: 'LOAD_PROPOSALS_FROM_NETWORK', payload})
  const loadProposalsFailed = () => dispatch({type: 'LOAD_PROPOSALS_FAILED'})
  const vote = (payload: VotePayload) => dispatch({type: 'VOTE', payload})
  const submitVotes = () => dispatch({type: 'SUBMIT_VOTES'})
  const submitVotesDone = () => dispatch({type: 'SUBMIT_VOTES_DONE'})
  const submitVotesFailed = () => dispatch({type: 'SUBMIT_VOTES_FAILED'})

  return {
    state,
    loadProposalsFromCache,
    loadProposalsFromNetwork,
    loadProposalsFailed,
    vote,
    submitVotes,
    submitVotesDone,
    submitVotesFailed
  }
}
