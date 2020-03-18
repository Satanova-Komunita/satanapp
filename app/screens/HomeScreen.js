import * as React from 'react'
import {Container, Row, Button} from '../components'
import {SCREENS} from '../constants'

export default function HomeScreen({route, navigation}) {
  /*const {
    id
  } = route.params*/

  return (
    <Container>
      <Row>
        <Button label='Volba kandidáta' onPress={() => navigation.navigate(SCREENS.voteCandidate.name)}/>
      </Row>
      <Row>
        <Button label='Sabatní hlasování' onPress={() => navigation.navigate(SCREENS.voteSabatProposal.name)}/>
      </Row>
      <Row>
        <Button label='Odhlásit' onPress={() => navigation.navigate(SCREENS.login.name)}/>
      </Row>
    </Container>
  )
}
