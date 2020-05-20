import * as React from 'react'
import {storageSet, removeItem, storageGet} from '../lib'

interface Identity {
  token: string,
  memberNumber: number,
  status: 'INITIALIZING'|'SIGNED_OUT'|'SIGNED_IN'
}

interface IdentityContextValue {
  identity: Identity,
  setIdentity: (token: string, memberNumber: number) => void,
  resetIdentity: () => void
}

const EMPTY_IDENTITY: Identity = {
  token: '',
  memberNumber: 0,
  status: 'INITIALIZING'
}

const STORAGE_KEY = 'identity:last'

const IdentityContext = React.createContext<IdentityContextValue>({
  identity: EMPTY_IDENTITY,
  setIdentity: () => {},
  resetIdentity: () => {}
})

IdentityContext.displayName = 'IdentityContext'

const IdentityProvider: React.FunctionComponent = ({children}) => {
  const [identity, setIdentity] = React.useState<Identity>(EMPTY_IDENTITY)

  React.useEffect(() => {
    storageGet(STORAGE_KEY)
      .then((result: any) => {
        if (result === null) {
          return setIdentity({...EMPTY_IDENTITY, status: 'SIGNED_OUT'})
        }
        return setIdentity({
          token: result.token,
          memberNumber: result.memberNumber,
          status: 'SIGNED_IN'
        })
      })
      .catch((error) => console.error('Error while initializing identity', error))
  }, [])

  return (
    <IdentityContext.Provider value={{
      identity,
      setIdentity: (token: string, memberNumber: number) => {
        return storageSet(STORAGE_KEY, {token, memberNumber}).then(() => {
          setIdentity({token, memberNumber, status: 'SIGNED_IN'})
        })
      },
      resetIdentity: () => {
        return removeItem(STORAGE_KEY).then(() => {
          setIdentity({...EMPTY_IDENTITY, status: 'SIGNED_OUT'})
        })
      }
    }}>
      {children}
    </IdentityContext.Provider>
  )
}

const useIdentity = () => React.useContext<IdentityContextValue>(IdentityContext)

export {
  IdentityProvider,
  useIdentity
}
