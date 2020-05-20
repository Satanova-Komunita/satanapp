import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {LoginScreen, HomeScreen, VoteSabatProposal} from '../screens'
import {useIdentity} from '../context'

export type RootStackParamList = {
  Login: undefined,
  Home: undefined,
  VoteSabatProposal: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export const Navigation: React.FunctionComponent = () => {
  const {identity} = useIdentity()

  if (identity.status === 'INITIALIZING') {
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {identity.status === 'SIGNED_IN' ? (
          <>
            <Stack.Screen name={'Home'} component={HomeScreen} options={{
              header: () => null
            }}/>
            <Stack.Screen name={'VoteSabatProposal'} component={VoteSabatProposal} options={{
              title: 'Volba sabatního návrhu'
            }}/>
          </>
        ):(
          <Stack.Screen name={'Login'} component={LoginScreen} options={{
            header: () => null
          }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
