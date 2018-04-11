import React, { Component } from 'react';
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  static navigationOptions = {
    title: 'Login'
  };

  login() {
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', marginBottom: 10, paddingLeft: 10}} type="text" placeholder="Username" value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
        <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', paddingLeft: 10}} secureTextEntry={true} placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
        <TouchableOpacity onPress={ () => this.login() }>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    //backgroundColor: '#FF585B',
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
});