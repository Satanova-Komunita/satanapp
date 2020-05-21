import * as React from 'react'

export interface Identity {
  token: string,
  memberNumber: number,
  status: 'INITIALIZING'|'SIGNED_OUT'|'SIGNED_IN'
}

export const EMPTY_IDENTITY: Identity = {
  token: '',
  memberNumber: 0,
  status: 'INITIALIZING'
}

type ActionPayload = {
  token: string,
  memberNumber: number
}

type Action =
  | {type: 'SET_IDENTITY', payload: ActionPayload}
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
  const setIdentity = (payload: ActionPayload) => dispatch({type: 'SET_IDENTITY', payload})
  const resetIdentity = () => dispatch({type: 'RESET_IDENTITY'})

  return {
    identity,
    setIdentity,
    resetIdentity
  }
}
