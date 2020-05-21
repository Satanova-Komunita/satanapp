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
  | {type: 'SIGN_IN', payload: ActionPayload}
  | {type: 'SIGN_OUT'}

const reducer = (state: Identity, action: Action): Identity => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        token: action.payload.token,
        memberNumber: action.payload.memberNumber,
        status: 'SIGNED_IN'
      }
    case 'SIGN_OUT':
      return {
        ...EMPTY_IDENTITY,
        status: 'SIGNED_OUT'
      }
  }
}

export const useControlIdentity = () => {
  const [identity, dispatch] = React.useReducer(reducer, EMPTY_IDENTITY)
  const signIn = (payload: ActionPayload) => dispatch({type: 'SIGN_IN', payload})
  const signOut = () => dispatch({type: 'SIGN_OUT'})

  return {
    identity,
    signIn,
    signOut
  }
}
