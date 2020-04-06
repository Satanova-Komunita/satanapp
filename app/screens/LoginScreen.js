import * as React from 'react'
import styled from 'styled-components'
import {Input, Button, Container, Row} from '../components'
import {SCREENS, API} from '../constants'
import {useIdentity} from '../context'
import {requestPost} from '../lib'

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

const parseResponse = (response) => {
  const {
    data: {
      JWT,
      userData: {
        member_number: memberNumber
      } = {}
    } = {}
  } = response

  return {
    token: JWT,
    memberNumber: parseInt(memberNumber)
  }
}

export default function LoginScreen({navigation}) {
  const [id, setId] = React.useState('')
  const [hasError, setError] = React.useState(false)
  const {setIdentity} = useIdentity()

  return (
    <Container>
      <Row>
        <Header>SATANCARE</Header>
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
            requestPost({
              url: API.login, payload: {
                member_number: id
              }
            })
              .then(response => parseResponse(response))
              .then(({token, memberNumber}) => setIdentity({token, memberNumber}))
              .then(() => {
                setError(false)
                navigation.navigate(SCREENS.home.name)
              })
              .catch(error => {
                console.log(error)
                setError(true)
              })
          }}
          label='Přihlásit'
        />
      </Row>
    </Container>
  )
}
