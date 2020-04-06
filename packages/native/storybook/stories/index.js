import React, {useState} from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import {ThemeProvider} from 'styled-components'
//import Button from './Button';
import CenterView from './CenterView'
import Welcome from './Welcome';
import {Button} from '../../components'
import {QuadraticVotingButton} from '../../screens/VoteSabatProposal/QuadraticVotingButton'
import {theme} from '../../theme'

//storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

/*storiesOf('DemoButton', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));*/

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => <Button label='Press me!'/>)

const QuadraticVotingButtonWithState = () => {
  const [votes, setVote] = useState(10)
  const [proposal, setProposal] = useState({
    text: 'Humanitární bombardování',
    point: 0
  })

  return <QuadraticVotingButton
    votes={votes}
    point={proposal.point}
    text={proposal.text}
    handleOnChange={(result) => {
      // setVote
      // setProposal point
    }}
  />
}

storiesOf('QuadraticVotingButton', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with short text', () => {

    return <QuadraticVotingButtonWithState/>
  })
