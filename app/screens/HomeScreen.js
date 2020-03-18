import * as React from 'react'
import {Container, Row, Button} from '../components'

export default function HomeScreen({route, navigation}) {
  /*const {
    id
  } = route.params*/

  return (
    <Container>
      <Row>
        <Button label='Sabatní hlasování'/>
      </Row>
      <Row>
        <Button label='Volba kandidáta'/>
      </Row>
      <Row>
        <Button label='Odhlásit' onPress={() => navigation.navigate('Login')}/>
      </Row>
    </Container>
  )
}
