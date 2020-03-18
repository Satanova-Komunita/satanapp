import 'react-native-gesture-handler'
import * as React from 'react'
import styled from 'styled-components'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {ThemeProvider} from 'styled-components'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import VoteCandidateScreen from './screens/VoteCandidateScreen'
import VoteSabatProposalScreen from './screens/VoteSabatProposalScreen'
import {theme} from './theme'
import {SCREENS} from './constants'

const Stack = createStackNavigator()

const Body = styled.View`
  flex: 1
`

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Body>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={SCREENS.login.name}>
            <Stack.Screen name={SCREENS.login.name} component={LoginScreen} options={{
              header: () => null
            }}/>
            <Stack.Screen name={SCREENS.home.name} component={HomeScreen} options={{
              header: () => null
            }}/>
            <Stack.Screen name={SCREENS.voteCandidate.name} component={VoteCandidateScreen} options={{
              title: SCREENS.voteCandidate.title
            }}/>
            <Stack.Screen name={SCREENS.voteSabatProposal.name} component={VoteSabatProposalScreen} options={{
              title: SCREENS.voteSabatProposal.title
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Body>
    </ThemeProvider>
  )
}
