import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View, 
  Button,
  Switch, 
  Image,
  TouchableOpacity,
  Alert,
  Clipboard } from 'react-native';
import { iOSColors } from 'react-native-typography';


export default class InviteScreen extends Component {
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
    title: 'Invite Your Mates',
    gesturesEnabled: false,
  });

  copyToClipBoard = async () => {
    await Clipboard.setString('munchmates.herokuapp.com');
    Alert.alert('Copied!')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/background4.jpg')} style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, height: '50%'}}/>

        <View style={{position: 'absolute', top: '15%', left: '5%', right: '5%', backgroundColor: 'rgba(105,105,105,0.8)', zIndex: 2, display: 'flex', justifyContent: 'space-around', height: '20%'}}>
          <Text style={{fontSize: 25, color: 'white', textAlign: 'center'}}>Food is better with your mates.</Text>
          <TouchableOpacity onPress={() => this.copyToClipBoard()}>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>munchmates.herokuapp.com</Text>
          </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: '50%', bottom: 0, left: 0, right: 0, backgroundColor: 'white', display: 'flex'}}>
          <Text style={{fontSize: 20, color: iOSColors.yellow, textAlign: 'center', fontWeight: 'bold', paddingTop: '10%', paddingBottom: '5%'}}>
            Or invite them on your favorite platform!
          </Text>

          <View style={{height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: '10%'}}>
              <TouchableOpacity><Image source={require('../assets/facebook-icon.png')} /></TouchableOpacity>
              <TouchableOpacity><Image source={require('../assets/twitter-icon.png')} /></TouchableOpacity>
              <TouchableOpacity><Image source={require('../assets/wechat-icon.png')} /></TouchableOpacity>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: '10%'}}>
              <TouchableOpacity><Image source={require('../assets/whatsapp-icon.png')} /></TouchableOpacity>
              <TouchableOpacity><Image source={require('../assets/google-icon.png')} /></TouchableOpacity>
              <TouchableOpacity><Image source={require('../assets/sms-icon.png')} /></TouchableOpacity>
            </View>
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
  }
});