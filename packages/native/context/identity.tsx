import * as React from 'react'
import {storageSet, removeItem, storageGet} from '../lib'

interface Identity {
  token: string,
  memberNumber: number,
  isLogged: boolean,
  isInitialized: boolean
}

interface IdentityContextValue {
  identity: Identity,
  setIdentity: (token: string, memberNumber: number) => void,
  resetIdentity: () => void
}

const EMPTY_IDENTITY: Identity = {
  token: '',
  memberNumber: 0,
  isLogged: false,
  isInitialized: false
}

const STORAGE_KEY = 'identity:last'

const IdentityContext = React.createContext<IdentityContextValue>({
  identity: EMPTY_IDENTITY,
  setIdentity: () => {},
  resetIdentity: () => {}
})

IdentityContext.displayName = 'IdentityContext'

const IdentityProvider: React.FunctionComponent = ({children}) => {
  const [identity, setIdentity] = React.useState<Identity>(() => {
    return EMPTY_IDENTITY
  })

  React.useEffect(() => {
    storageGet(STORAGE_KEY)
      .then((result: any) => {
        if (result === null) {
          return setIdentity({...EMPTY_IDENTITY, isInitialized: true})
        }
        return setIdentity({
          token: result.token,
          memberNumber: result.memberNumber,
          isLogged: true,
          isInitialized: true
        })
      })
      .catch(console.error)
  }, [])

  return (
    <IdentityContext.Provider value={{
      identity,
      setIdentity: (token, memberNumber) => {
        return storageSet(STORAGE_KEY, {token, memberNumber}).then(() => {
          setIdentity({token, memberNumber, isLogged: true, isInitialized: true})
        })
      },
      resetIdentity: () => {
        return removeItem(STORAGE_KEY).then(() => {
          setIdentity({...EMPTY_IDENTITY, isInitialized: true})
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
