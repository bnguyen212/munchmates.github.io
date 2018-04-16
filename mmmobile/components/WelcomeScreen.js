import React, { Component } from 'react';
import { StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput } from 'react-native';
import { iOSColors, sanFranciscoWeights } from 'react-native-typography';

export default class WelcomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null
  };
  register() {
    this.props.navigation.navigate('Register');
  }
  login() {
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>

        <View style={styles.backgroundContainer}>
          <Image source={require('../assets/background1.jpg')} style={styles.backgroundImage} />
        </View>

        <View style={styles.container}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>MUNCHMATES</Text>
          </View>

          <View style={styles.navContainer}>

            <TouchableOpacity onPress={ () => this.login() } style={[styles.button, styles.buttonBlue]}>
              <Text style={styles.buttonLabel}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.register() } style={[styles.button, styles.buttonRed]} >
              <Text style={styles.buttonLabel}>Register</Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    top: '20%'
  },
  navContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
  },
  titleContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 50,
    color: iOSColors.yellow,
    ...sanFranciscoWeights.heavy,
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 30,
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
    color: iOSColors.white
  },
});
