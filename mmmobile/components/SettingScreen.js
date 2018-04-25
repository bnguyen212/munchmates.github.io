import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View, 
  Button,
  Switch } from 'react-native';
import { iOSColors } from 'react-native-typography';


export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: true,
      weekly: false,
      articles: false,
      vendor: true
    }
  }

  static navigationOptions = (props) => ({
    title: 'Settings',
    gesturesEnabled: false,
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.setting}>
          <Text style={styles.text}>Daily Notifications</Text>
          <Switch value={this.state.daily}
                  onValueChange={value => this.setState({daily: value})}
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
  }
});