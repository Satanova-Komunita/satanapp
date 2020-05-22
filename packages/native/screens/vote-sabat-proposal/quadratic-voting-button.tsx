import React from 'react'
import {TouchableOpacity, GestureResponderEvent} from 'react-native'
import styled from 'styled-components/native'

interface Props {
  name: string,
  handleOnChange: Function,
  value: number,
  votes: number
}

interface VotingButtonProps {
  symbol: '+'|'-',
  disabled: boolean,
  handleOnChange: (event: GestureResponderEvent) => void
}

const Container = styled.View`
  background-color: #222;
  width: 100%;
  margin-bottom: 3px;
`

const VotingText = styled.Text`
  color: ${p => p.theme.text.color};
  text-align: center;
  font-size: 22px;
  padding: 15px 0;
`

const ButtonText = styled.Text`
  color: ${p => p.disabled ? p.theme.button.disabled.color : p.theme.button.dark.color};
  font-size: 30px;
  font-weight: bold;
  padding: 5px 25px;
  border-style: solid;
  border-color: #111;
  border-top-width: 3px;
  border-right-width: 3px;
  border-left-width: 3px;
  text-align: center;
  background: ${p => p.disabled ? p.theme.button.disabled.background : p.theme.button.dark.background};
`

const StatusText = styled.Text`
  color: ${p => p.theme.text.color};
  font-size: 30px;
  padding: 5px 25px;
  flex: 1;
  text-align: center;
  border-color: #111;
  border-top-width: 3px;
`

const StyledVotingStatus = styled.View`
  flex-direction: row;
`

const VotingButton: React.FunctionComponent<VotingButtonProps> = ({symbol, disabled, handleOnChange}) => {
  return (
    <TouchableOpacity
      onPress={handleOnChange}
      disabled={disabled}
    >
      <ButtonText disabled={disabled}>{symbol}</ButtonText>
    </TouchableOpacity>
  )
}

const calculatePlus = (value: number, votes: number) => {
  const previousPrice = value * value
  const newProposalValuePlus = value + 1
  const priceForPlus = (newProposalValuePlus * newProposalValuePlus) - previousPrice
  const newVotesPlus = votes - priceForPlus

  return {
    newVotesPlus,
    newProposalValuePlus
  }
}

const calculateMinus = (value: number, votes: number) => {
  const previousPrice = value * value
  const newProposalValueMinus = value - 1
  const priceForMinus = previousPrice - (newProposalValueMinus * newProposalValueMinus)
  const newVotesMinus = votes + priceForMinus

  return {
    newVotesMinus,
    newProposalValueMinus
  }
}

export const QuadraticVotingButton: React.FunctionComponent<Props> = ({name, handleOnChange, value, votes}) => {
  const {newVotesPlus, newProposalValuePlus} = calculatePlus(value, votes)
  const {newVotesMinus, newProposalValueMinus} = calculateMinus(value, votes)

  return (
    <Container>
      <VotingText>{name}</VotingText>
      <StyledVotingStatus>
        <VotingButton
          symbol='+'
          disabled={(value >= 0 && newVotesPlus < 0)}
          handleOnChange={() => handleOnChange({
            newProposalValue: newProposalValuePlus,
            newVotes: newVotesPlus
          })}
        />
        <StatusText>{value}</StatusText>
        <VotingButton
          symbol='-'
          disabled={(value <= 0 && newVotesMinus < 0)}
          handleOnChange={() => handleOnChange({
            newProposalValue: newProposalValueMinus,
            newVotes: newVotesMinus
          })}
        />
      </StyledVotingStatus>
    </Container>
  )
}
