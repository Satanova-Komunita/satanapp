import React from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {theme} from '../../../theme'

const BackgroundContainer = styled.View`
  flex: 1;
  background-color: ${p => p.theme.screen.background};
  justify-content: center;
  align-items: center;
`

const SizeContainer = styled.View`
  width: 90%;
  align-items: center;
`

export default function CenterView({children}) {
  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer>
        <SizeContainer>
          {children}
        </SizeContainer>
      </BackgroundContainer>
    </ThemeProvider>
  )
}
