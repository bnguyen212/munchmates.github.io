import React, { Component } from 'react';
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  Image,
  KeyboardAvoidingView } from 'react-native';
import { iOSColors, sanFranciscoWeights } from 'react-native-typography'

export default class HomeScreen extends Component {
  static navigationOptions =  ({
    title: 'HomeScreen'
  });

  render() {
    return (
      <Text>Hello Brian! I have been expecting you!</Text>
    )
  }
}
