import * as React from 'react'
import {Container, Row, Button} from '../../components'
import {storageClear} from '../../lib'

export const SettingsScreen: React.FunctionComponent = () => {
  return (
    <Container>
      <Row>
        <Button label='Smazat cache' onPress={() => storageClear()}/>
      </Row>
    </Container>
  )
}
