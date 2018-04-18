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
import { iOSColors, sanFranciscoWeights } from 'react-native-typography';
import MapView, { Marker } from 'react-native-maps';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {region: {latitude: 37.771733, longitude: -122.409324, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
  }

    static navigationOptions = (props) => ({
    title: 'Munchmates',
    header: null
  });

  componentWillMount() {
    this.props.navigator.geolocation.getCurrentPosition(res => {
      this.setState({latitude: res.coords.latitude, longitude: red.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421})
    }, 
    err => {
      alert(err.message)
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 300000
    }
    ) 
  }

  render() {
    return (
      <MapView region={this.state.region}
               onRegionChange={region => this.setState({region})}>

      </MapView>
    )
  }
}