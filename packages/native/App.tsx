import 'react-native-gesture-handler'
import * as React from 'react'
import styled from 'styled-components/native'
import {ThemeProvider} from 'styled-components'
import {theme} from './theme'
import {IdentityProvider} from './context'
import {Navigation} from './navigation'

const Body = styled.View`
  flex: 1
`

//export default from './storybook'

export default function App() {
  return (
  <IdentityProvider>
    <ThemeProvider theme={theme}>
      <Body>
        <Navigation/>
      </Body>
    </ThemeProvider>
  </IdentityProvider>
  )
}
