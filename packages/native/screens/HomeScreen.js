import * as React from 'react'
import {Container, Row, Button} from '../components'
import {SCREENS} from '../constants'
import {useIdentity} from '../context'

export default function HomeScreen({navigation}) {
  const {resetIdentity} = useIdentity()

  return (
    <Container>
      <Row>
        <Button label='Sabatní hlasování' onPress={() => navigation.navigate(SCREENS.voteSabatProposal.name)}/>
      </Row>
      <Row>
        <Button label='Odhlásit' onPress={() => {
          resetIdentity()
          navigation.navigate('Login')
        }}/>
      </Row>
    </Container>
  )
}
