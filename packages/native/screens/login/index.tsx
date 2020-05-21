import * as React from 'react'
import {fold} from 'fp-ts/lib/Either'
import {pipe} from 'fp-ts/lib/pipeable'
import styled from 'styled-components/native'
import {Button, Container, Input, Row} from '../../components'
import {requestPost} from '../../lib'
import {API} from '../../constants'
import {useIdentity} from '../../context'
import {Member} from '../../types'

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

const decode = (response: any): Promise<Member> => {
  return new Promise((resolve, reject) => pipe(
    Member.decode({
      token: response?.data?.JWT,
      number: parseInt(response?.data?.userData?.member_number)
    }),
    fold(
      (errors) => reject(errors),
      (decoded) => resolve(decoded)
    )
  ))
}

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
            requestPost({
              url: API.login,
              payload: {
                member_number: id
              }
            }).then(response => decode(response))
              .then(response => signIn(response))
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
