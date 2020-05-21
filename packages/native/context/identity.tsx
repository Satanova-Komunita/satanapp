import * as React from 'react'
import {storageSet, removeItem, storageGet} from '../lib'
import {useControlIdentity, EMPTY_IDENTITY} from './use-control-identity'

const STORAGE_KEY = 'identity:last'

const IdentityContext = React.createContext({
  identity: EMPTY_IDENTITY,
  signIn: (token: string, memberNumber: number) => {},
  signOut: () => {}
})

IdentityContext.displayName = 'IdentityContext'

const IdentityProvider: React.FunctionComponent = ({children}) => {
  const {identity, signIn, signOut} = useControlIdentity()

  React.useEffect(() => {
    storageGet(STORAGE_KEY)
      .then((result: any) => {
        if (!result) {
          return signOut
        }
        return  signIn({token: result.token, memberNumber: result.memberNumber})
      })
      .catch((error) => console.error('Error while initializing identity', error))
  }, [])

  return (
    <IdentityContext.Provider value={{
      identity,
      signIn: (token: string, memberNumber: number) => {
        return storageSet(STORAGE_KEY, {token, memberNumber}).then(() => signIn({token, memberNumber}))
      },
      signOut: () => removeItem(STORAGE_KEY).then(() => signOut())
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
