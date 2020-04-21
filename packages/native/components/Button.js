import * as React from 'react'
import styled from 'styled-components'

const StyledTouchableOpacity = styled.TouchableOpacity`
  background: ${p => p.disabled ? p.theme.button.disabled.background : p.theme.button.default.background};
  width: 100%;
  height: 60px;
  border: 1px solid ${p => p.disabled ? p.theme.button.disabled.border : p.theme.button.default.border};
  border-radius: 10px;
`

const StyledText = styled.Text`
  color: ${p => p.disabled ? p.theme.button.disabled.color : p.theme.button.default.color};
  text-align: center;
  font-size: 20px;
  line-height: 60px;
  font-weight: bold;
`

export const Button = ({label, disabled = false, ...props}) => {
  return (
    <StyledTouchableOpacity
      {...props}
      disabled={disabled}
    >
      <StyledText disabled={disabled}>{label}</StyledText>
    </StyledTouchableOpacity>
  )
}
