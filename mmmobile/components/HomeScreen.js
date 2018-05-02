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
import { iOSColors, sanFranciscoWeights } from 'react-native-typography'
import MapView, {Marker} from 'react-native-maps';

export default class HomeScreen extends Component {
  static navigationOptions =  ({
    title: 'HomeScreen'
  });
  constructor(props){
    super(props);
    this.state={
      longitude:0,
      latitude:0,
      markers:[{title:"me",latlng:{longitude:0,
      latitude:0}}]
      }
    }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition((success)=>{

      this.setState({
        latitude:success.coords.latitude,
        longitude: success.coords.longitude,
        markers:[{title:"me", latlng:{latitude:success.coords.latitude,
        longitude: success.coords.longitude}}]
      })
      console.log(this.state)
    }, (error)=>{})


}
  componentDidMount(){
    fetch(`/*ngrok*//places`, {
      method: 'GET',
    }).then(response=>response.json()).then(response => {
      //alert(response)
      for(var i = 0; i<response.length; i++ ){

        var place={title:response[i].name,
           latlng:{latitude:response[i].lat,
             longitude: response[i].long}}
        var addto= [...this.state.markers]
        addto.push(place)
        this.setState({
          markers: addto
        })
        console.log(this.state.markers)
      }
    })
  }
  render() {
    return (
      <MapView
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.012,
          longitudeDelta: 0.0067,
        }} style={{width: '100%', height:'100%'}}
      >
        {this.state.markers.map(marker => (
    <Marker
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
</MapView>
    )
  }
}
