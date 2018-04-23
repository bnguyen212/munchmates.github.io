import React, { Component } from 'react';
import { 
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity } from 'react-native';
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={{uri: 'https://media.licdn.com/dms/image/C5603AQEvcIbPuG1kmA/profile-displayphoto-shrink_800_800/0?e=1529352000&v=beta&t=mnF4g7mKIHmwh26xYnuGTgjC4-rQQcp1_R6F8Rqyc1U'}} style={styles.image} />
          <Text style={styles.name}>WALL-E</Text>
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
            <TouchableOpacity onPress={() => this.redirect('Favorites')}>
              <Text style={styles.navItem}>FAVORITES</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('RecommendationsHistory')}>
              <Text style={styles.navItem}>RECOMMENDATIONS HISTORY</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('')}>
              <Text style={styles.navItem}>SETTINGS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('')}>
              <Text style={styles.navItem}>INVITE A FRIEND</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navItemContainer}>
            <TouchableOpacity onPress={() => this.redirect('')}>
              <Text style={styles.navItem}>SUPPORT</Text>
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
    paddingVertical: 20,
    flex: 0.4
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: iOSColors.yellow
  },
  name: {
    fontSize: 30,
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
    paddingVertical: 10,
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