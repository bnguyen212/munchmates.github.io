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
import { iOSColors, sanFranciscoWeights } from 'react-native-typography'
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { Location, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import SwitchSelector from 'react-native-switch-selector';

const options = [
    { label: 'All', value: 0 },
    { label: 'For Me', value: 1 },
    { label: 'Favorites', value: 2 },
    { label: 'Upcoming', value: 3 }
];

export default class MapScreen extends Component {
  static navigationOptions = props => ({
    title: 'Map',
    headerLeft: <TouchableOpacity onPress={() => {props.navigation.goBack()}}><View style={styles.nav}><Icon name='ios-arrow-back' style={styles.navArrow}/><Text style={styles.navText}>Profile </Text></View></TouchableOpacity>,
    headerRight: <TouchableOpacity onPress={() => {props.navigation.navigate('ContentFeed')}}><View style={styles.nav}><Text style={styles.navText}>Content Feed</Text><Icon name='ios-arrow-forward' style={styles.navArrow}/></View></TouchableOpacity>,
    gesturesEnabled: false,
  });

  constructor(props){
    super(props);
    this.state={
      filter: 0,
      markerColor: 'red',
      data: []
    };

    this.vendors = [ 
      { 
        id: 123,
        name: 'Panda Express',
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.411461, 
          latitude: 37.777861, 
        }, 
        priceRange: '$$', 
        type: 'popup' 
      } ,
      {
        id: 234,
        name: 'Modernist Spring Dinner', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.407942, 
            latitude: 37.77493
          }, 
          priceRange: '$$$', 
          type: 'popup' 
      } ,
      {
        id: 345,
        name: 'Noodle in a Haystack', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.405009, 
          latitude: 37.772142, 
        }, 
        priceRange: '$', 
        type: 'truck' 
      } ,
      {
        id: 456,
        name: 'Northern Iranian Spring Dinner', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.412327, 
          latitude: 37.772028, 
        }, 
        priceRange: '$$$', 
        type: 'popup' 
      } ,
      {
        id: 567,
        name: 'The Silk Road Tacos', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.416916, 
          latitude: 37.775638
        }, 
        priceRange: '$', 
        type: 'truck' 
      } ,
      {
        id: 678,
        name: 'Vegan Date Night', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.410972, 
          latitude: 37.765257
        }, 
        priceRange: '$$', 
        type: 'popup' 
      } ,
      {
        id: 789,
        name: 'ICHIDO Japanese Omakase', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.401595, 
          latitude: 37.783592
        }, 
        priceRange: '$$', 
        type: 'truck' 
      } ,
      {
        id: 890,
        name: 'Istanbul Modern', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.401219, 
          latitude: 37.767852
        }, 
        priceRange: '$$$$', 
        type: 'popup' 
      } ,
      { 
        id: 901,
        name: '4-Course Brunch', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.41942, 
          latitude: 37.77493
        }, 
        priceRange: '$$', 
        type: 'truck' 
      } ,
      {
        id: 1234,
        name: 'Eat Stay Love Lafayette Food Tour', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.404954, 
          latitude: 37.781441
        },
        priceRange: '$$$$', 
        type: 'popup' 
      } ,
    ];
    this.recommendations = [
      { 
        id: 123,
        name: 'Panda Express',
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.411461, 
          latitude: 37.777861, 
        }, 
        priceRange: '$$', 
        type: 'popup' 
      } ,
      {
        id: 234,
        name: 'Modernist Spring Dinner', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.407942, 
            latitude: 37.77493
          }, 
          priceRange: '$$$', 
          type: 'popup' 
      } ,
      {
        id: 345,
        name: 'Noodle in a Haystack', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.405009, 
          latitude: 37.772142, 
        }, 
        priceRange: '$', 
        type: 'truck' 
      } ,
      {
        id: 456,
        name: 'Northern Iranian Spring Dinner', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.412327, 
          latitude: 37.772028, 
        }, 
        priceRange: '$$$', 
        type: 'popup' 
      }
    ];
    this.favorites = [
      {
        id: 456,
        name: 'Northern Iranian Spring Dinner', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.412327, 
          latitude: 37.772028, 
        }, 
        priceRange: '$$$', 
        type: 'popup' 
      } ,
      {
        id: 567,
        name: 'The Silk Road Tacos', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.416916, 
          latitude: 37.775638
        }, 
        priceRange: '$', 
        type: 'truck' 
      } ,
      {
        id: 678,
        name: 'Vegan Date Night', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.410972, 
          latitude: 37.765257
        }, 
        priceRange: '$$', 
        type: 'popup' 
      }
    ];
    this.upcoming = [
      {
        id: 678,
        name: 'Vegan Date Night', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.410972, 
          latitude: 37.765257
        }, 
        priceRange: '$$', 
        type: 'popup' 
      } ,
      {
        id: 789,
        name: 'ICHIDO Japanese Omakase', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.401595, 
          latitude: 37.783592
        }, 
        priceRange: '$$', 
        type: 'truck' 
      } ,
      {
        id: 890,
        name: 'Istanbul Modern', 
        desc: ['Chinese', 'Takeout', 'Steak'],
        coords: {
          longitude: -122.401219, 
          latitude: 37.767852
        }, 
        priceRange: '$$$$', 
        type: 'popup' 
      }
    ]
  }

  fetchLocation = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return alert('No permission to access current location.')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({ region: {longitude: location.coords.longitude, latitude: location.coords.latitude, latitudeDelta: 0.025, longitudeDelta: 0.025 } });
  }

  fetchVendors() {
    //send server current region in this.state and get back a list of vendors, favorites, recommended, and upcoming
  }

  setFavorite(vendorId) {
    //tells server to check if user favorited this vendor, if yes then unfavorite, if no then add to favorites
  }

  setFilter(value) {
    let color;
    let data;
    switch (value) {
      case 0:
        color = iOSColors.red;
        data = this.vendors
        break;
      case 1:
        color = iOSColors.blue;
        data = this.recommendations;
        break;
      case 2:
        color = iOSColors.yellow;
        data = this.favorites;
        break;
      case 3:
        color = iOSColors.green;
        data = this.upcoming
        break;
    }
    this.setState({filter: value, markerColor: color, data: data});
  }

  componentWillMount(){
    // navigator.geolocation.getCurrentPosition((success)=>{
    //   this.setState({
    //     latitude:success.coords.latitude,
    //     longitude: success.coords.longitude,
    //     markers:[{title:"me", latlng:{latitude:success.coords.latitude,
    //     longitude: success.coords.longitude}}]
    //   })
    //   console.log(this.state)
    // }, (error)=>{})
  }

  componentDidMount(){
    // fetch(`/*ngrok*//places`, {
    //   method: 'GET',
    // }).then(response=>response.json()).then(response => {
    //   //alert(response)
    //   for(var i = 0; i<response.length; i++ ){
    //     var place={title:response[i].name,
    //        latlng:{latitude:response[i].lat,
    //          longitude: response[i].long}}
    //     var addto= [...this.state.markers]
    //     addto.push(place)
    //     this.setState({
    //       markers: addto
    //     })
    //     console.log(this.state.markers)
    //   }
    // })
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
              //onMapReady={() => this.fetchLocation()}
              style={styles.mapView} 
              >
              { this.state.data.map((vendor, id) => (

                <Marker key={vendor.id} coordinate={vendor.coords}
                        pinColor={this.state.markerColor} >
                  <Callout onPress={() => AlertIOS.alert('Favorited!')}>
                    <View style={styles.calloutView}>
                      <Text style={styles.calloutTitle}>{vendor.name}</Text>
                      <View style={styles.calloutTags}>
                        { vendor.desc.map((word, i) => (
                          <View key={i} style={styles.calloutTagBorder}>
                            <Text style={styles.calloutTagText}>{word}</Text>
                          </View>
                          ))
                        }
                      </View>
                      <Text style={styles.calloutInfo}>{vendor.priceRange} | {vendor.type.toUpperCase()}</Text>
                    </View>
                  </Callout>
                </Marker>
                ))
              }
            </MapView>

            <View style={styles.selector}>
              <SwitchSelector options={options} 
                              borderColor={iOSColors.yellow}
                              buttonColor={iOSColors.yellow}
                              backgroundColor='black'
                              hasPadding={true}
                              initial={0} 
                              selectedColor='black'
                              textColor={iOSColors.yellow}
                              animationDuration={10}
                              onPress={value => this.setFilter(value)}/>
            </View>
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