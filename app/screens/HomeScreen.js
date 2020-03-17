import * as React from 'react'
import { View, Text } from 'react-native'

export default function HomeScreen({route}) {
  const {
    id
  } = route.params

  return (
    <View>
      <Text>Welcome: {id}</Text>
    </View>
  )
}
