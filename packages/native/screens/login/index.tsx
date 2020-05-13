import * as React from 'react'
import styled from 'styled-components/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../../navigation'
import {Button, Container, Input, Row} from '../../components'
import {requestPost} from '../../lib'
import {API} from '../../constants'
import {useIdentity} from '../../context'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

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

const validateResponse = (response: any) => {
  if (typeof response !== 'object') {
    throw new Error('Validation of login failed: response must be an object')
  }
  if (typeof response.data !== 'object') {
    throw new Error('Validation of login failed: property data is missing on response')
  }
  if (typeof response.data.JWT !== 'string') {
    throw new Error('Validation of login failed: property data.JWT is missing on response')
  }
  if (typeof response.data.userData !== 'object') {
    throw new Error('Validation of login failed: property data.userData is missing on response')
  }
  if (typeof response.data.userData.member_number === 'undefined') {
    throw new Error('Validation of login failed: property data.userData.member_number is missing on response')
  }
  if (parseInt(response.data.userData.member_number) <= 0) {
    throw new Error('Validation of login failed: property data.userData.member_number must be an int greater than zero')
  }

  return response
}

const parseResponse = (response: any) => ({
  token: response.data.JWT,
  memberNumber: parseInt(response.data.userData.member_number)
})

export const LoginScreen: React.FunctionComponent<Props> = ({navigation}) => {
  const [id, setId] = React.useState('')
  const [hasError, setError] = React.useState(false)
  const {setIdentity} = useIdentity()

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
              url: API.login, payload: {
                member_number: id
              }
            }).then(response => validateResponse(response))
              .then(response => parseResponse(response))
              .then(response => {
                setError(false)
                setId('')
                setIdentity({token: response.token, memberNumber: response.memberNumber})
                navigation.navigate('Home')
              })
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
