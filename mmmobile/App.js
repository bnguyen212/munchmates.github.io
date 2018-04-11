import React from 'react';
import { serverurl } from 'react-native-dotenv';
console.log('serverurl', serverurl);
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
    console.log("tusa basti")
    if (this.state.username === '' || this.state.password === '') {
      alert('Invalid username or password.')
    } else {
      console.log("dolu", serverurl)
      fetch(`${serverurl}/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.props.navigation.navigate('Login');
        /* do something with responseJson and go back to the Login view but
        * make sure to check for responseJson.success! */
      })
      .catch((err) => {
        console.log(err)
        alert(err.message);
      });
    }
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
    if (this.state.username === '' || this.state.password === '') {
      alert('Invalid username or password.')
    } else {
      fetch(`${serverurl}/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.props.navigation.navigate('Home')
      })
      .then(()=>AsyncStorage.setItem('user', JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })))
      .catch((err) => {
        alert( err);
      });
    }
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
class Home extends React.Component{
  static navigationOptions = {
    title: 'Home'
  };
  render(){
    return(
    <View><Text>Finn doesn't welcome you</Text></View>
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

  },
  Home:{
    screen: Home,
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
