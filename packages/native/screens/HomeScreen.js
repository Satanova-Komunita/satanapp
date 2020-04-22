import * as React from 'react'
import styled from 'styled-components'
import {Container, Row, Button} from '../components'
import {SCREENS} from '../constants'
import {useIdentity} from '../context'
import {clear} from '../lib'

const CellContainer = styled.View`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`

const LefCell = styled.View`
  width: 50%;
  padding-right: 10px;
`

const RightCell = styled.View`
  width: 50%;
  padding-left: 10px;
`

export default function HomeScreen({navigation}) {
  const {identity, resetIdentity} = useIdentity()
  console.log('identity', identity)

  return (
    <Container>
      <Row>
        <Button label='Sabatní hlasování' onPress={() => navigation.navigate(SCREENS.voteSabatProposal.name)}/>
      </Row>
      <Row>
        <CellContainer>
          <LefCell>
            <Button label='Smazat cache' onPress={() => clear()}/>
          </LefCell>
          <RightCell>
            <Button label='Odhlásit' onPress={() => {
              resetIdentity()
              navigation.navigate(SCREENS.login.name)
            }}/>
          </RightCell>
        </CellContainer>
      </Row>
    </Container>
  )
}
