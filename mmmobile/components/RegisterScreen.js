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
import { iOSColors } from 'react-native-typography'
import Icon from 'react-native-vector-icons/Ionicons'

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
    }
  }
  static navigationOptions = (props) => ({
    title: 'Register',
    headerRight: <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}}><View style={styles.navRight}><Text style={styles.navText}>Login </Text><Icon name='ios-arrow-forward' style={styles.navArrow}/></View></TouchableOpacity>
  });

  register() {
    if (this.state.email.length < 5) {
      Alert.alert('Email is too short')
    } else if (this.state.password.length < 5) {
      Alert.alert('Password is too short')
    } else if (this.state.password !== this.state.password2) {
      Alert.alert('Passwords do not match')
    } else {
      fetch('https://munchmates.herokuapp.com/register', {
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.success === true) {
          this.setState({email: '', password: '', password2: ''})
          this.props.navigation.navigate('Login')
        } else {
          Alert.alert(res.err)
        }
      })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <View style={styles.backgroundContainer}>
          <Image source={require('../assets/background2.jpg')} style={styles.backgroundImage} />
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
          <TextInput style={styles.input}
                     secureTextEntry={true}
                     placeholder="Confirm Password"
                     value={this.state.password2}
                     onChangeText={password2 => this.setState({password2})} />
          <TouchableOpacity style={styles.button} onPress={ () => this.register() }>
            <Text style={styles.buttonLabel}>Register</Text>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  navText: {
    fontSize: 17, 
    color: iOSColors.blue,
  },
  navArrow: {
    fontSize: 35, 
    color: iOSColors.blue,
    paddingTop: 3
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
    backgroundColor: iOSColors.red,
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