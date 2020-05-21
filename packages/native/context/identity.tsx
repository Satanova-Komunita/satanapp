import * as React from 'react'
import {storageSet, removeItem} from '../lib'
import {useControlIdentity, EMPTY_IDENTITY} from './use-control-identity'
import {restoreIdentity} from './restore-identity'
import {UserIdentity} from './types'

const STORAGE_KEY = 'identity:last'

const IdentityContext = React.createContext({
  identity: EMPTY_IDENTITY,
  signIn: (identity: UserIdentity) => {},
  signOut: () => {}
})

IdentityContext.displayName = 'IdentityContext'

const IdentityProvider: React.FunctionComponent = ({children}) => {
  const {identity, setIdentity, resetIdentity} = useControlIdentity()

  React.useEffect(() => {
    restoreIdentity(STORAGE_KEY)
      .then(({token, memberNumber}) => setIdentity({token, memberNumber}))
      .catch(() => resetIdentity())
  }, [])

  return (
    <IdentityContext.Provider value={{
      identity,
      signIn: (identity: UserIdentity) => {
        return storageSet(STORAGE_KEY, identity).then(() => setIdentity(identity))
      },
      signOut: () => removeItem(STORAGE_KEY).then(() => resetIdentity())
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
