import * as React from 'react'
import {storageSet, removeItem} from '../lib'
import {useControlIdentity, EMPTY_IDENTITY} from './use-control-identity'
import {restoreIdentity} from './restore-identity'
import {Member} from '../types'

const STORAGE_KEY = 'identity:last'

const IdentityContext = React.createContext({
  identity: EMPTY_IDENTITY,
  signIn: (identity: Member) => {},
  signOut: () => {}
})

IdentityContext.displayName = 'IdentityContext'

const IdentityProvider: React.FunctionComponent = ({children}) => {
  const {identity, setIdentity, resetIdentity} = useControlIdentity()

  React.useEffect(() => {
    restoreIdentity(STORAGE_KEY)
      .then((identity) => setIdentity(identity))
      .catch(() => resetIdentity())
  }, [])

  return (
    <IdentityContext.Provider value={{
      identity,
      signIn: (identity: Member) => {
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
