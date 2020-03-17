import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

function DarkButton({text, ...props}) {
  return (
    <TouchableOpacity style={styles.buttonWrapper}>
      <Text style={styles.buttonLabel} {...props}>{text}</Text>
    </TouchableOpacity>
  )
}

export default function HomeScreen({route, navigation}) {
  /*const {
    id
  } = route.params*/

  return (
    <View style={styles.container}>
      <DarkButton text={'Sabatní hlasování'} />
      <DarkButton text={'Volba kandidáta'} />
      <DarkButton text={'Odhlásit'} onPress={() => navigation.navigate('Login')}/>
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null,
};

const COLORS = {
  background: '#111111',
  mainTextColor: '#ee1e3e',
  inputBorder: '#444',
  inputBackground: '#333333'
}

const SIZES = {
  width: '90%',
  height: 60,
  fontSize: 20
}

const BORDER = {
  inputs: {
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 50,
    color: COLORS.mainTextColor,
    textAlign: 'center',
    marginBottom: 20
  },
  buttonWrapper: {
    backgroundColor: COLORS.inputBackground,
    width: SIZES.width,
    height: SIZES.height,
    ...BORDER.inputs,
    marginBottom: 20
  },
  buttonLabel: {
    color: COLORS.mainTextColor,
    textAlign: 'center',
    fontSize: SIZES.fontSize,
    lineHeight: SIZES.height,
    fontWeight: 'bold'
  }
})

