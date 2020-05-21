import * as React from 'react'
import {Member} from '../types'

interface Identity extends Member {
  status: 'INITIALIZING'|'SIGNED_OUT'|'SIGNED_IN'
}

export const EMPTY_IDENTITY: Identity = {
  token: '',
  number: 0,
  status: 'INITIALIZING'
}

type Action =
  | {type: 'SET_IDENTITY', payload: Member}
  | {type: 'RESET_IDENTITY'}

const reducer = (state: Identity, action: Action): Identity => {
  switch (action.type) {
    case 'SET_IDENTITY':
      return {
        ...action.payload,
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
  const setIdentity = (payload: Member) => dispatch({type: 'SET_IDENTITY', payload})
  const resetIdentity = () => dispatch({type: 'RESET_IDENTITY'})

  return {
    identity,
    setIdentity,
    resetIdentity
  }
}
