import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View, 
  Button,
  Switch,
  AsyncStorage,
  TouchableOpacity } from 'react-native';
import { iOSColors } from 'react-native-typography';


export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static navigationOptions = (props) => ({
    title: 'Settings',
    gesturesEnabled: false,
  });

  componentWillMount() {
    AsyncStorage.getItem('email')
    .then(user => {
      return this.setState({user});
    })
    .then(res => fetch("https://munchmates.herokuapp.com/user?email=" + this.state.user))
    .then(res => res.json())
    .then(res => {
      this.setState({daily: res.daily,
                     weekly: res.weekly, 
                     articles: res.articles, 
                     vendor: res.vendor})
    })
  }

  updateSetting() {
    console.log(this.state);
    fetch('https://munchmates.herokuapp.com/user/settings', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.user,
        daily: this.state.daily,
        weekly: this.state.weekly,
        articles: this.state.articles,
        vendor: this.state.vendor,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.ok === true) {
        this.props.navigation.navigate('Profile')
      }
    })
    .catch(err => {
      Alert.alert('Failed to update')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.setting}>
          <Text style={styles.text}>Daily Notifications</Text>
          <Switch value={this.state.daily}
                  onValueChange={value => 
                    {console.log(value);
                      this.setState({daily: value})}}
                  tintColor={iOSColors.yellow} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.text}>Weekly Newsletter</Text>
          <Switch value={this.state.weekly}
                  onValueChange={value => this.setState({weekly: value})}
                  tintColor={iOSColors.yellow} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.text}>Trending Articles Notifications</Text>
          <Switch value={this.state.articles}
                  onValueChange={value => this.setState({articles: value})}
                  tintColor={iOSColors.yellow} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.text}>New Vendor Notifications</Text>
          <Switch value={this.state.vendor}
                  onValueChange={value => this.setState({vendor: value})}
                  tintColor={iOSColors.yellow} />
        </View>
        <View style={styles.setting}>
          <TouchableOpacity style={styles.button} onPress={ () => this.updateSetting() }>
            <Text style={styles.buttonLabel}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
  },
  setting: {
    height: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: iOSColors.yellow,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    width: '80%',
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: iOSColors.green,
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }
});