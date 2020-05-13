import * as React from 'react'

interface Identity {
  token: string,
  memberNumber: number,
  isLogged: boolean
}

interface SetIdentityArgs {
  token: string,
  memberNumber: number
}

interface IdentityContextValue {
  identity: Identity,
  setIdentity: (args: SetIdentityArgs) => void,
  resetIdentity: () => void
}

const EMPTY_IDENTITY: Identity = {
  token: '',
  memberNumber: 0,
  isLogged: false
}

const IdentityContext = React.createContext<IdentityContextValue>({
  identity: EMPTY_IDENTITY,
  setIdentity: () => {},
  resetIdentity: () => {}
})

IdentityContext.displayName = 'IdentityContext'

/*
const validateSetIdentity = ({token, memberNumber}) => {
  if (typeof token !== 'string' || !token.length) {
    throw new Error(`Token must be a non empty string`)
  }
  if (typeof memberNumber !== 'number' || memberNumber <= 0) {
    throw new Error(`Member number must a number greater than 0`)
  }
}*/

const IdentityProvider: React.FunctionComponent = ({children}) => {
  const [identity, setIdentity] = React.useState<Identity>(EMPTY_IDENTITY)

  return (
    <IdentityContext.Provider value={{
      identity,
      setIdentity: ({token, memberNumber}: SetIdentityArgs) => {
        setIdentity({token, memberNumber, isLogged: true})
      },
      resetIdentity: () => {
        setIdentity(EMPTY_IDENTITY)
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
