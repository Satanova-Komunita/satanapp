import * as React from 'react'
import {UserIdentity} from './types'

interface Identity extends UserIdentity {
  status: 'INITIALIZING'|'SIGNED_OUT'|'SIGNED_IN'
}

export const EMPTY_IDENTITY: Identity = {
  token: '',
  memberNumber: 0,
  status: 'INITIALIZING'
}

type Action =
  | {type: 'SET_IDENTITY', payload: UserIdentity}
  | {type: 'RESET_IDENTITY'}

const reducer = (state: Identity, action: Action): Identity => {
  switch (action.type) {
    case 'SET_IDENTITY':
      return {
        token: action.payload.token,
        memberNumber: action.payload.memberNumber,
        status: 'SIGNED_IN'
      }
    case 'RESET_IDENTITY':
      return {
        ...EMPTY_IDENTITY,
        status: 'SIGNED_OUT'
      }
  }
}

export const useControlIdentity = () => {
  const [identity, dispatch] = React.useReducer(reducer, EMPTY_IDENTITY)
  const setIdentity = (payload: UserIdentity) => dispatch({type: 'SET_IDENTITY', payload})
  const resetIdentity = () => dispatch({type: 'RESET_IDENTITY'})

  return {
    identity,
    setIdentity,
    resetIdentity
  }
}
