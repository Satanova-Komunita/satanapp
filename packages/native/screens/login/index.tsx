import * as React from 'react'
import styled from 'styled-components/native'
import {Button, Container, Input, Row} from '../../components'
import {useIdentity} from '../../context'
import {sendLoginRequest} from './send-login-request'

const Header = styled.Text`
  font-size: 50px;
  color: ${p => p.theme.text.color};
  text-align: center;
`

const Error = styled.Text`
  font-size: 18px;
  color: ${p => p.theme.text.color};
  text-align: center;
`

export const LoginScreen: React.FunctionComponent = () => {
  const [id, setId] = React.useState('')
  const [hasError, setError] = React.useState(false)
  const {signIn} = useIdentity()

  return (
    <Container>
      <Row>
        <Header>SATAN APP</Header>
      </Row>
      <Row>
        {hasError && <Error>Přihlášení se nezdařilo</Error>}
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
          onPress={() => {
            sendLoginRequest(id)
              .then((member) => signIn(member))
              .catch((error) => {
                console.error(error)
                setError(true)
              })
          }}
          label='Přihlásit'
        />
      </Row>
    </Container>
  )
}
