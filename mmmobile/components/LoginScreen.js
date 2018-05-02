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
  import AsyncStorage from "AsyncStorage"
  import { iOSColors, sanFranciscoWeights } from 'react-native-typography'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }
  static navigationOptions = (props) => ({
    title: 'Login',
  });
  componentWillMount(){
    this.props.navigation.navigate('Home')
  }
  login() {
    if (this.state.username === '' || this.state.password === '') {
      alert('Invalid username or password.')
    } else {
      fetch(`/*ngrok*//login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
        })
      })
      .then((response) => {var x= response.json();
    console.log(response, "response1")
    console.log(x, "x")
  return x})
      .then((responseJson) => {
        console.log(responseJson, "response")
        this.props.navigation.navigate('Home')
      })
      .then(()=>AsyncStorage.setItem('user', JSON.stringify({
        username: this.state.email,
        password: this.state.password
      })))
      .catch((err) => {
        alert( err);
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <View style={styles.backgroundContainer}>
          <Image source={require('../assets/background3.jpg')} style={styles.backgroundImage} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>MUNCHMATES</Text>
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
          <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => this.login() }>
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
  },
  buttonRed: {
    backgroundColor: iOSColors.red,
  },
  buttonBlue: {
    backgroundColor: iOSColors.blue,
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  title: {
    fontSize: 30,
    color: iOSColors.yellow,
    ...sanFranciscoWeights.heavy,
    marginTop: 15,
    marginBottom: 15,
  },
  titleContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  backgroundContainer: {
    position: 'absolute',
    top: '5%',
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
