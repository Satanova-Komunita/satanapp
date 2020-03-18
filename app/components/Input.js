import * as React from 'react'
import styled, {ThemeContext} from 'styled-components'

const StyledTextInput = styled.TextInput`
  color: ${p => p.theme.text.color};
  font-size: 20px;
  background-color: ${p => p.theme.input.backgroundColor};
  padding: 0 20px;
  width: 100%;
  height: 60px;
  text-align: center;
  border: 1px solid ${p => p.theme.input.borderColor};
  border-radius: 10px;
`

export const Input = (props) => {
  const themeContext = React.useContext(ThemeContext)

  return <StyledTextInput
    {...props}
    placeholderTextColor={themeContext.text.color}
  />
}
