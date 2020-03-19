import * as React from 'react'
import {Text, View} from 'react-native'
import styled from 'styled-components'
//import {Container} from '../components'

export const Container = styled.View`
  flex: 1;
  background-color: ${p => p.theme.screen.background};
  align-items: center;
`

const StyledHeadingContainer = styled.View`
  border-bottom-width: 2px;
  border-style: solid;
  border-color: #333;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`

const StyledHeading = styled.Text`
  color: ${p => p.theme.text.color};
  padding: 25px 0;
  font-size: 30px;
  width: 90%;
`

const Heading = ({text}) => {
  return (
    <StyledHeadingContainer>
      <StyledHeading>{text}</StyledHeading>
    </StyledHeadingContainer>
  )
}

const StyledVotingContainer = styled.View`
  background-color: #222;
  width: 90%;
  margin-bottom: 10px
  ;
`

const StyledVotingText = styled.Text`
  color: ${p => p.theme.text.color};
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
`

const StyledVotingButton = styled.TouchableOpacity`

`

const VisibleText = styled.Text`
  color: ${p => p.theme.text.color};
  font-size: 30px;
  font-weight: bold;
  padding: 10px 20px;
  border: 3px solid #111;
`

const StatusText = styled.Text`
  color: ${p => p.theme.text.color};
  font-size: 30px;
    padding: 10px;
  flex: 1;
  text-align: center;
`

const StyledVotingStatus = styled.View`
  flex-direction: row;
`

const QuadraticVotingButton = ({text}) => {
  return (
    <StyledVotingContainer>
      <StyledVotingText>{text}</StyledVotingText>
      <StyledVotingStatus>
        <StyledVotingButton>
          <VisibleText>+</VisibleText>
        </StyledVotingButton>
        <StatusText>+4</StatusText>
        <StyledVotingButton>
          <VisibleText>-</VisibleText>
        </StyledVotingButton>
      </StyledVotingStatus>
    </StyledVotingContainer>
  )
}

export default function VoteSabatProposalScreen() {
  return (
    <Container>
      <Heading text='Humanitární pomoc ve třetím světě'/>
        <QuadraticVotingButton text='Konzerva pro každého hladového afričana'/>
        <QuadraticVotingButton text='Humanitární bombardování'/>
      <Heading text='Práva trasngresivabnormalirelevant znevýhodněných lidí'/>
    </Container>
  )
}
