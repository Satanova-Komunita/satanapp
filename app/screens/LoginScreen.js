import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';

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

export default function LoginScreen({navigation}) {
  const [id, setId] = React.useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SATANCARE</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setId}
        value={id}
        placeholder='Zadej tvoje číslo'
        placeholderTextColor={COLORS.mainTextColor}
        keyboardType='numeric'
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {
          id
        })}
        style={styles.loginButtonWrapper}
      >
        <Text style={styles.loginButtonLabel}>Přihlásit</Text>
      </TouchableOpacity>
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};

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
  textInput: {
    color: COLORS.mainTextColor,
    backgroundColor: COLORS.inputBackground,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    width: SIZES.width,
    height: SIZES.height,
    fontSize: SIZES.fontSize,
    alignSelf: 'center',
    textAlign: 'center',
    ...BORDER.inputs
  },
  loginButtonWrapper: {
    backgroundColor: COLORS.inputBackground,
    width: SIZES.width,
    height: SIZES.height,
    ...BORDER.inputs
  },
  loginButtonLabel: {
    color: COLORS.mainTextColor,
    textAlign: 'center',
    fontSize: SIZES.fontSize,
    lineHeight: SIZES.height,
    fontWeight: 'bold'
  }
});
