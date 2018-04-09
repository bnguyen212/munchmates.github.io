import React from 'react';
import {   StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  AsyncStorage,

  PanResponder,
  Animated,
  Dimensions} from 'react-native';
  import { StackNavigator } from 'react-navigation';

class Welcome extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  register() {
    this.props.navigation.navigate('Register');
  }
  press() {
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>MUNCHMATES</Text>
          <TouchableOpacity onPress={ () => {this.press()} } style={styles.button}>
            <Text style={styles.buttonLabel}>Tap to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
            <Text style={styles.buttonLabel}>Tap to Register</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  static navigationOptions = {
    title: 'Register'
  };
  registerButton() {

  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', marginBottom: 10, paddingLeft: 10}} type="text" placeholder="Username" value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
        <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', paddingLeft: 10}} secureTextEntry={true} placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
        <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', paddingLeft: 10}} secureTextEntry={true} placeholder="Confirm Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
        <TouchableOpacity style={styles.button} onPress={ () => {this.registerButton()} }>
          <Text style={styles.buttonLabel}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
class LoginScreen extends React.Component {
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

  registerButton() {
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', marginBottom: 10, paddingLeft: 10}} type="text" placeholder="Username" value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
        <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', paddingLeft: 10}} secureTextEntry={true} placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
        <TouchableOpacity onPress={ () => {this.registerButton()} }>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


export default StackNavigator({
  Welcome: {
    screen: Welcome,
  },
  Register: {
    screen: RegisterScreen,
  },
  Login: {
    screen: LoginScreen,

  }

}, {initialRouteName: 'Welcome'});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
