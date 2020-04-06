import * as React from 'react'

const IdentityContext = React.createContext({})
IdentityContext.displayName = 'IdentityContext'

const IdentityProvider = ({children}) => {
  const [token, setToken] = React.useState('')
  const [memberNumber, setMemberNumber] = React.useState(0)

  return (
    <IdentityContext.Provider value={{
      token,
      memberNumber,
      setIdentity: ({token, memberNumber}) => {
        setToken(token)
        setMemberNumber(memberNumber)
      },
      resetIdentity: () => {
        setToken('')
        setMemberNumber(0)
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
