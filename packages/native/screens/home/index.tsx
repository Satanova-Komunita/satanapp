import * as React from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../../navigation'
import {Container, Row, Button} from '../../components'
import {useIdentity} from '../../context'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

export const HomeScreen: React.FunctionComponent<Props> = ({navigation}) => {
  const {signOut} = useIdentity()

  return (
    <Container>
      <Row>
        <Button label='Sabatní hlasování' onPress={() => navigation.navigate('VoteSabatProposal')}/>
      </Row>
      <Row>
        <Button label='Nastavení' onPress={() => navigation.navigate('Settings')}/>
      </Row>
      <Row>
        <Button label='Odhlásit' onPress={() => signOut()}/>
      </Row>
    </Container>
  )
}
