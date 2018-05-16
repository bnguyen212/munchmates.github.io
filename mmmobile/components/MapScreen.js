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
import moment from 'moment';
import vendors from '../assets/vendors';
import upcoming from '../assets/upcoming';
import recommendations from '../assets/recommendations';
import favorites from '../assets/favorites';
// console.log(recommendations);

const options = [
    { label: 'All', value: 0 },
    { label: 'For Me', value: 1 },
    { label: 'Favorites', value: 2 },
    { label: 'Upcoming', value: 3 }
];

const priceRange = [0, '$', '$$', '$$$', '$$$$'];

export default class MapScreen extends Component {
  static navigationOptions = props => ({
    title: 'Vendor Map',
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

     this.vendors = vendors.concat(upcoming).map((item, i) => {
      return {id: item['vendor-name'] + item.latitude,
              name: item['vendor-name'],
              desc: item.cuisine,
              coords: {
                latitude: item.latitude,
                longitude: item.longitude
              },
              priceRange: priceRange[item.price],
              type: item.type
              }
     })

     this.favorites = favorites.map((item, i) => {
      return {id: item['vendor-name'] + item.latitude,
              name: item['vendor-name'],
              desc: item.cuisine,
              coords: {
                latitude: item.latitude,
                longitude: item.longitude
              },
              priceRange: priceRange[item.price],
              type: item.type
              }
     });

    this.recommendations = recommendations.map((item, i) => {
      return {id: item['vendor-name'] + item.latitude,
              name: item['vendor-name'],
              desc: item.cuisine,
              coords: {
                latitude: item.latitude,
                longitude: item.longitude
              },
              priceRange: priceRange[item.price],
              type: item.type
              }
     })

    this.upcoming = upcoming.map((item, i) => {
      return {id: item['vendor-name'] + item.latitude,
              name: item['vendor-name'],
              desc: item.cuisine,
              coords: {
                latitude: item.latitude,
                longitude: item.longitude
              },
              priceRange: priceRange[item.price],
              type: item.type,
              range: 500
              }
     })
  }

  fetchLocation = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return alert('No permission to access current location.')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({ region: {longitude: location.coords.longitude, latitude: location.coords.latitude, latitudeDelta: 0.0663, longitudeDelta: 0.0517 } });
  }

  fetchVendors() {
    //send server current region in this.state and get back a list of vendors, favorites, recommended, and upcoming
  }

  setFavorite(vendor) {
    //tells server to check if user favorited this vendor, if yes then unfavorite, if no then add to favorites
    let result = this.favorites.find(item => {
      return item.id === vendor.id
    });
    if (!result) {
      this.favorites.push(vendor);
      Alert.alert('Added to favorites')
    } else {
      Alert.alert('Already in favorites')
    }
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
                this.state.data.map(vendor => (
                  <Marker key={vendor.id} coordinate={vendor.coords}
                          pinColor={this.state.markerColor} >
                    <Callout onPress={() => this.setFavorite(vendor)}>
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
                        { vendor.date ? <Text style={styles.calloutInfo}>{moment(new Date(vendor.date), 'YYYY-MM-DDThh:mm:ss.SSSZ').format("MMMM D, YYYY")}</Text> : null }
                      </View>
                    </Callout>
                  </Marker>
                ))
              }
              {
                this.state.filter !== 3 ? null : (this.state.data.map((vendor, i) => {
                  if (vendor.type === 'popup' && vendor.range) {
                    return (<Circle key={vendor.id}
                                    center={vendor.coords}
                                    radius={vendor.range}
                                    strokeWidth={2}
                                    strokeColor={this.state.markerColor}
                                    fillColor='rgba(0, 204, 68, 0.2)' />)
                  } else {
                    return null
                  }
                }))
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