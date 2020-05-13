import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import VoteSabatProposal from '../screens/VoteSabatProposal'
import {LoginScreen} from '../screens'

export type RootStackParamList = {
  Login: undefined,
  Home: undefined,
  VoteSabatProposal: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export const Navigation: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name={'Login'} component={LoginScreen} options={{
          header: () => null
        }}/>
        <Stack.Screen name={'Home'} component={HomeScreen} options={{
          header: () => null
        }}/>
        <Stack.Screen name={'VoteSabatProposal'} component={VoteSabatProposal} options={{
          title: 'Volba sabatního návrhu'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
