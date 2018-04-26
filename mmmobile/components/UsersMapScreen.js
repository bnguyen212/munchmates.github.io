import React, { Component } from 'react';
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  AlertIOS,
  Button,
  Image,
  KeyboardAvoidingView } from 'react-native';
import { iOSColors } from 'react-native-typography'
import MapView, { Marker } from 'react-native-maps';
import { Location, Permissions } from 'expo';

export default class UsersMapScreen extends Component {
  static navigationOptions = props => ({
    title: 'Users Map',
    gesturesEnabled: false,
  });

  constructor(props){
    super(props);
    this.state={
      users: [
        {
          coords: {
            longitude: -122.411461, 
            latitude: 37.777861, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.412461, 
            latitude: 37.778861, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.410461, 
            latitude: 37.776861, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.411461, 
            latitude: 37.778861, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.412461, 
            latitude: 37.777861, 
          },
          type: 1
        },
        {
          coords: {
            longitude: -122.411461, 
            latitude: 37.776861, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.410461, 
            latitude: 37.777861, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.409461, 
            latitude: 37.776861, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.411461, 
            latitude: 37.775861, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.413461, 
            latitude: 37.779861, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.413948, 
            latitude: 37.768159, 
          },
          type: 1
        },
        {
          coords: {
            longitude: -122.415246, 
            latitude: 37.767802,  
          },
          type: 1
        },
        {
          coords: {
            longitude: -122.412143, 
            latitude: 37.767824, 
          },
          type: 1
        },
        {
          coords: {
            longitude: -122.412679, 
            latitude: 37.769943, 
          },
          type: 1
        },
        {
          coords: {
            longitude: -122.411578, 
            latitude: 37.769074, 
          },
          type: 3
        },
        {
          coords: {
            longitude: -122.415387, 
            latitude: 37.768940, 
          },
          type: 1
        },
        {
          coords: {
            longitude: -122.413779, 
            latitude: 37.765750, 
          },
          type: 1
        },
        {
          coords: {
            longitude: -122.410083, 
            latitude: 37.765995, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.412114, 
            latitude: 37.771259, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.415782, 
            latitude: 37.766687, 
          },
          type: 1
        },




        {
          coords: {
            longitude: -122.402109, 
            latitude: 37.786637, 
          },
          type: 1
        },
        {
          coords: {
            longitude: -122.401549, 
            latitude: 37.786135, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.404754, 
            latitude: 37.784426, 
          },
          type: 3
        },
        {
          coords: {
            longitude: -122.402109, 
            latitude: 37.784185, 
          },
          type: 2
        },
        {
          coords: {
            longitude: -122.400532, 
            latitude: 37.785411, 
          },
          type: 3
        },
        {
          coords: {
            longitude: -122.399795, 
            latitude: 37.782798, 
          },
          type: 3
        },
        {
          coords: {
            longitude: -122.402745, 
            latitude: 37.782919, 
          },
          type: 3
        },
        {
          coords: {
            longitude: -122.403863, 
            latitude: 37.783743, 
          },
          type: 3
        },
        {
          coords: {
            longitude: -122.409318, 
            latitude: 37.780129, 
          },
          type: 3
        },
        {
          coords: {
            longitude: -122.412134, 
            latitude: 37.779121, 
          },
          type: 1
        },
        {
          coords: {
            longitude: -122.412456, 
            latitude: 37.777537, 
          },
          type: 3
        },
      ]
    };
  }

  fetchLocation = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return alert('No permission to access current location.')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({ region: {longitude: location.coords.longitude, latitude: location.coords.latitude, latitudeDelta: 0.025, longitudeDelta: 0.025 } });
  }

  setColor(value) {
    let color;
    switch (value) {
      case 1:
        color = iOSColors.red;
        break;
      case 2:
        color = iOSColors.blue;
        break;
      case 3:
        color = iOSColors.green;
        break;
    }
    return color
  }


  componentDidMount(){
    this.fetchLocation();
    this.setState({data: this.vendors});
  }
  render() {
    return (
      <View style={styles.container}>
        { !this.state.region ? <Text>Loading...</Text> : (
            <View style={styles.map}>
            <MapView
              provider="google"
              mapType="standard"
              showsUserLocation={true}
              rotateEnabled={false}
              showsMyLocationButton={true}
              region={this.state.region}
              onRegionChangeComplete={region => this.setState({region})}
              style={styles.mapView} 
              >
              { 
                this.state.users.map((user, id) => (
                  <Marker key={id} coordinate={user.coords}
                          pinColor={this.setColor(user.type)}
                          title={user.coords.longitude + ', ' + user.coords.latitude}>
                  </Marker>
                ))
              }
            </MapView>
            </View>
        ) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  selector: {
    position: 'absolute',
    bottom: '12%',
    left: '10%',
    right: '10%',
    zIndex: 2,
    opacity: 0.8
  },
  container: {
    width: '100%',
    height: '100%'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  calloutView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 300
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
    textAlign: 'center'
  },
  calloutTags: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 2
  },
  calloutTagBorder: {
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 2,
    backgroundColor: 'black'
  },
  calloutTagText: {
    color: iOSColors.yellow,
    fontSize: 10
  },
  calloutInfo: {
    fontWeight: 'bold',
    fontSize: 15
  }
});