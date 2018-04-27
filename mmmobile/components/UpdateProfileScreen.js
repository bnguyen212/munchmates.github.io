import React, { Component } from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  Text,
  View, 
  TextInput,
  AsyncStorage } from 'react-native';
import { iOSColors } from 'react-native-typography';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const genderOptions = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Other', value: 'Other'}
]

const ageOptions = [
  {label: 'Under 18', value: 1},
  {label: '18 to 24', value: 2},
  {label: '25 to 34', value: 3},
  {label: '35 to 44', value: 4},
  {label: '45 to 54', value: 5},
  {label: 'Above 54', value: 6}
]

const foodieOptions = [
  {label: 'I eat food', value: 1},
  {label: 'Live to eat', value: 2},
  {label: 'Foodie', value: 3},
  {label: 'Connoisseur', value: 4},
]

export default class UpdateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static navigationOptions = (props) => ({
    title: 'Update Profile',
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
      this.setState({
                     fname: res.fname,
                     lname: res.lname, 
                     location: res.location, 
                     gender: res.gender , 
                     agerange: res.agerange,
                     expertise: res.expertise})
    })
  }

  updateProfile() {
    console.log(this.state);
    fetch('https://munchmates.herokuapp.com/user/profile', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.user,
        fname: this.state.fname,
        lname: this.state.lname,
        location: this.state.location,
        gender: this.state.gender,
        agerange: this.state.agerange,
        expertise: this.state.expertise
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
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{marginBottom: '20%'}}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput value={this.state.user} editable={false} style={[styles.input, styles.disabled]}/>

          <Text style={styles.label}>FIRST NAME</Text>
          <TextInput onChangeText={fname => this.setState({fname})} 
                     value={this.state.fname} 
                     style={styles.input} />

          <Text style={styles.label}>LAST NAME</Text>
          <TextInput onChangeText={lname => this.setState({lname})}
                     value={this.state.lname} 
                     style={styles.input} />

          <Text style={styles.label}>LOCATION (City & State)</Text>
          <TextInput onChangeText={location => this.setState({location})}
                     value={this.state.location}
                     style={styles.input} />

          <Text style={styles.label}>GENDER</Text>
          <RNPickerSelect
            items={genderOptions}
            placeholder={{
              label: 'Select your gender',
              value: '',
            }}
            onValueChange={gender => this.setState({gender: gender})}
            style={{ ...pickerSelectStyles }}
            value={this.state.gender} />

          <Text style={styles.label}>AGE RANGE</Text>
          <RNPickerSelect
            items={ageOptions}
            placeholder={{
              label: 'Select your age range',
              value: 0,
            }}
            onValueChange={agerange => this.setState({agerange})}
            style={{ ...pickerSelectStyles }}
            value={this.state.agerange} />

          <Text style={styles.label}>EXPERTISE</Text>
          <RNPickerSelect
            items={foodieOptions}
            placeholder={{
              label: 'How well do you know about food?',
              value: 0,
            }}
            onValueChange={expertise => this.setState({expertise: expertise})}
            style={{ ...pickerSelectStyles }}
            value={this.state.expertise} />

          <TouchableOpacity style={styles.button} onPress={ () => this.updateProfile() }>
            <Text style={styles.buttonLabel}>Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: '10%',
    paddingVertical: '5%'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    marginTop: 5
  },
  disabled: {
    backgroundColor: '#e0e0e0'
  },
  button: {
    width: '100%',
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#999999',
    color: 'black',
    marginTop: 5

  },
});