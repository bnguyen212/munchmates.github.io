import React, { Component } from 'react';
import { 
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage } from 'react-native';
import { iOSColors } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons'


export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = (props) => ({
    title: 'Profile',
    gesturesEnabled: false,
    headerLeft: null,
    headerRight: <TouchableOpacity onPress={() => {props.navigation.navigate('Map')}}><View style={styles.nav}><Text style={styles.navText}>Map</Text><Icon name='ios-arrow-forward' style={styles.navArrow}/></View></TouchableOpacity>,

  });

  redirect(page) {
    this.props.navigation.navigate(page)
  }

  componentWillMount() {
    AsyncStorage.getItem('email')
    .then(user => {
      return this.setState({user});
    })
    .then(res => fetch("https://munchmates.herokuapp.com/user?email=" + this.state.user))
    .then(res => res.json())
    .then(res => {
      this.setState({firstName: res.fname})
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={require('../assets/userRadar.png')} style={styles.image} />
          <Text style={styles.name}>{this.state.firstName ? this.state.firstName : this.state.user}</Text>
        </View>
        <View style={styles.navigation}>
          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('UpdateProfile')}>
              <Text style={styles.navItem}>UPDATE PROFILE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('Preferences')}>
              <Text style={styles.navItem}>DIETARY PREFERENCES</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('')}>
              <Text style={styles.navItem}>MY FAVORITES</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('')}>
              <Text style={styles.navItem}>WEEKLY TOP 10</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('Setting')}>
              <Text style={styles.navItem}>SETTINGS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('Invite')}>
              <Text style={styles.navItem}>INVITE A FRIEND</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('Welcome')}>
              <Text style={styles.navItem}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 0.4
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  navigation: {
    display: 'flex',
    flex: 0.6,
    justifyContent: 'flex-end',
  },
  navItemContainer: {
    borderTopWidth: 0.5,
    borderColor: iOSColors.yellow
  },
  navItem: {
    fontSize: 20,
    textAlign: 'center',
    color: iOSColors.yellow,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  navText: {
    fontSize: 17, 
    color: iOSColors.blue,
  },
  navArrow: {
    fontSize: 35, 
    color: iOSColors.blue,
    paddingTop: 3,
    marginHorizontal: 5,
  },
});