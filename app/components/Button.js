import * as React from 'react'
import styled from 'styled-components'

const StyledTouchableOpacity = styled.TouchableOpacity`
  color: ${p => p.theme.text.color};
  background-color: ${p => p.theme.input.backgroundColor};
  width: 100%;
  height: 60px;
  border: 1px solid ${p => p.theme.input.borderColor};
  border-radius: 10px;
`

const StyledText = styled.Text`
  color: ${p => p.theme.text.color};
  text-align: center;
  font-size: 20px;
  line-height: 60px;
  font-weight: bold;
`

export const Button = (props) => {
  return (
    <StyledTouchableOpacity
      {...props}
    >
      <StyledText>{props.label}</StyledText>
    </StyledTouchableOpacity>
  )
}
