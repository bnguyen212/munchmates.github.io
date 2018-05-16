import React, { Component } from 'react';
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  AsyncStorage } from 'react-native';
  import { iOSColors } from 'react-native-typography'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'ptnguyen212@gmail.com',
      password: '12345',
    }
  }
  static navigationOptions = (props) => ({
    title: 'Login',
  });

  login() {
    fetch('https://munchmates.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.authenticated === true) {
        AsyncStorage.setItem('email', this.state.email);
        this.setState({email: '', password: ''})
        this.props.navigation.navigate('Profile')
      }
    })
    .catch(err => {
      Alert.alert('Failed to log in')
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <View style={styles.backgroundContainer}>
          <Image source={require('../assets/background3.jpg')} style={styles.backgroundImage} />
        </View>

        <View style={styles.formContainer}>
          <TextInput style={styles.input}
                     placeholder="Email"
                     value={this.state.email}
                     onChangeText={email => this.setState({email})} />
          <TextInput style={styles.input}
                     secureTextEntry={true}
                     placeholder="Password"
                     value={this.state.password}
                     onChangeText={password => this.setState({password})} />
          <TouchableOpacity style={styles.button} onPress={ () => this.login() }>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',

  },
  navRight: {
    fontSize: 20, 
    color: 'blue', 
    marginRight: 15
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 0.5,
    borderColor: 'black',
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: iOSColors.blue,
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});