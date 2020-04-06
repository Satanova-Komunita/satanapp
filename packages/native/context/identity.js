import * as React from 'react'

const IdentityContext = React.createContext({})
IdentityContext.displayName = 'IdentityContext'

const EMPTY_IDENTITY = {
  token: '',
  memberNumber: 0,
  isLogged: false
}

const validateSetIdentity = ({token, memberNumber}) => {
  if (typeof token !== 'string' || !token.length) {
    throw new Error(`Token must be a non empty string`)
  }
  if (typeof memberNumber !== 'number' || memberNumber <= 0) {
    throw new Error(`Member number must a number greater than 0`)
  }
}

const IdentityProvider = ({children}) => {
  const [identity, setIdentity] = React.useState(EMPTY_IDENTITY)

  return (
    <IdentityContext.Provider value={{
      identity,
      setIdentity: ({token, memberNumber}) => {
        validateSetIdentity({token, memberNumber})
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

const useIdentity = () => React.useContext(IdentityContext)

export {
  IdentityProvider,
  useIdentity
}
