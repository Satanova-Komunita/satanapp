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

export default function LoginScreen({navigation}) {
  const [id, setId] = React.useState('')
  const {setIdentity} = useIdentity()

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
          onPress={() => {
            requestPost({url: API.login, payload: {
                member_number: id
              }}).then(response => {
              setIdentity({
                token: response.data.JWT,
                memberNumber: response.data.userData.member_number
              })

              navigation.navigate(SCREENS.home.name)
            })
          }}
          label='Přihlásit'
        />
      </Row>
    </Container>
  )
}
