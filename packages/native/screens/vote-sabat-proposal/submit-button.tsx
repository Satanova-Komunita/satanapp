import * as React from 'react'
import styled from 'styled-components/native'
import {Button} from '../../components'
import {STATUS} from './constants'

const StatusText = styled.Text`
  color: white;
  text-align: left;
  margin: 10px;
`

const SubmitButtonContainer = styled.View`
  margin: 10px;
`

const SubmitStatusTest = styled.View`
  align-items: center;
`

const getSubmitButtonLabel = (status: string) => {
  switch (status) {
    case STATUS.default:
      return 'Odeslat'
    case STATUS.loading:
      return 'Odesílám'
    case STATUS.done:
      return 'Odhlasováno'
    case STATUS.error:
      return 'Odeslat znovu'
  }
}

const isSubmitButtonDisabled = (status: string) => status === STATUS.loading || status === STATUS.done

export const SubmitButton: React.FunctionComponent<{status: string, onPress: Function}> = ({status, onPress}) => {
  const label = getSubmitButtonLabel(status)
  const disabled = isSubmitButtonDisabled(status)

  return (
    <SubmitButtonContainer>
      <Button
        label={label}
        disabled={disabled}
        onPress={onPress}
      />
      {status === STATUS.error && (
        <SubmitStatusTest>
          <StatusText>Odeslání se nezdařilo</StatusText>
        </SubmitStatusTest>
      )}
    </SubmitButtonContainer>
  )
}
