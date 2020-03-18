import * as React from 'react'
import styled from 'styled-components'
import {Input, Button, Container, Row} from '../components'

const Header = styled.Text`
  font-size: 50px;
  color: ${p => p.theme.text.color};
  text-align: center;
`

export default function LoginScreen({navigation}) {
  const [id, setId] = React.useState('')

  return (
    <Container>
      <Row>
        <Header>SATANCARE</Header>
      </Row>
      <Row>
        <Input
          onChangeText={setId}
          value={id}
          placeholder='Zadej tvoje číslo'
          keyboardType='numeric'
        />
      </Row>
      <Row>
        <Button
          onPress={() => navigation.navigate('Home', {
            id
          })}
          label='Přihlásit'
        />
      </Row>
    </Container>
  )
}
