import * as React from 'react'
import {storageSet, removeItem, storageGet} from '../lib'

interface Identity {
  token: string,
  memberNumber: number,
  status: 'INITIALIZING'|'SIGNED_OUT'|'SIGNED_IN'
}

const EMPTY_IDENTITY: Identity = {
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

const STORAGE_KEY = 'identity:last'

const IdentityContext = React.createContext({
  identity: EMPTY_IDENTITY,
  setIdentity: (token: string, memberNumber: number) => {},
  resetIdentity: () => {}
})

IdentityContext.displayName = 'IdentityContext'

const IdentityProvider: React.FunctionComponent = ({children}) => {
  const [identity, dispatch] = React.useReducer(reducer, EMPTY_IDENTITY)

  React.useEffect(() => {
    storageGet(STORAGE_KEY)
      .then((result: any) => {
        if (result === null) {
          return dispatch({type: 'SIGN_OUT'})
        }

        return dispatch({type: 'SIGN_IN', payload: {
          token: result.token,
          memberNumber: result.memberNumber,
        }})
      })
      .catch((error) => console.error('Error while initializing identity', error))
  }, [])

  return (
    <IdentityContext.Provider value={{
      identity,
      setIdentity: (token: string, memberNumber: number) => storageSet(STORAGE_KEY, {token, memberNumber})
        .then(() => dispatch({type: 'SIGN_IN', payload: {
            token,
            memberNumber,
          }})),
      resetIdentity: () => removeItem(STORAGE_KEY).then(() => dispatch({type: 'SIGN_OUT'}))
    }}>
      {children}
    </IdentityContext.Provider>
  )
}

const useIdentity = () => React.useContext(IdentityContext)

export {
  IdentityProvider,
  useIdentity
}
