import React, { Component } from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  Text,
  View, 
  TextInput,
  Button,
  Alert } from 'react-native';
import { iOSColors } from 'react-native-typography';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TagSelect } from 'react-native-tag-select';


const budgetOptions = [
  { label: '$', value: 1 },
  { label: '$$', value: 2 },
  { label: '$$$', value: 3 },
  { label: '$$$$', value: 4 }
]

const cuisineOptions = [ 'African', 'American', 'Chinese', 'Thai', 'Japanese', 'Vietnamese', 'Indian', 'Middle Eastern', 'French', 'Italian', 'Spanish', 'Latin American', 'Mediterranean', 'Other Asian', 'Other European']

const dietOptions = [
  { label: 'None', value: 1 },
  { label: 'Vegan', value: 2 },
  { label: 'Vegetarian', value: 3 },
  { label: 'Pescatarian', value: 4 }
]

const allergyOptions = [ 'Peanut', 'Tree Nuts', 'Milk', 'Egg', 'Wheat', 'Soy', 'Fish', 'Shellfish', 'Meat', 'Poultry' ];

const ratingOptions = [
  { label: 'Don\'t care', value: 1 },
  { label: 'Slightly Important', value: 2 },
  { label: 'Important', value: 3 },
  { label: 'Very Important', value: 4 },
  { label: 'Extremely Important', value: 5}
]

export default class PreferencesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 2,
      diet: 5,
      cuisines: ['Thai', 'Vietnamese'],
      allergies: ['Wheat'],
      otherAllergy: 'Finn',
      popularityRating: 4,
      ratingRating: 5,
      proximityRating: 3,
      ambianceRating: 1,
      menuRating: 2
    }
  }
  static navigationOptions = (props) => ({
    title: 'Dietary Preferences',
    gesturesEnabled: false,
  });

  updatePreference() {
    this.props.navigation.pop()
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{marginBottom: '20%'}}>
          <Text style={styles.label}>BUDGET</Text>
          <RNPickerSelect
            items={budgetOptions}
            placeholder={{
              label: 'Select your budget',
              value: 0,
            }}
            onValueChange={budget => this.setState({budget: budget.value})}
            style={{ ...pickerSelectStyles }}
            value={this.state.budget} />

          <Text style={styles.label}>DIETARY RESTRICTION</Text>
          <RNPickerSelect
            items={dietOptions}
            placeholder={{
              label: 'Select your dietary restriction',
              value: 0,
            }}
            onValueChange={diet => this.setState({diet: diet.value})}
            style={{ ...pickerSelectStyles }}
            value={this.state.diet} />

          <Text style={styles.label}>WHAT CUISINES INTEREST YOU?</Text>
            <View style={styles.selectContainer}>
              <TagSelect
                data={cuisineOptions}
                value={this.state.cuisines}
                ref={(tag) => {
                  this.cuisineTag = tag;
                }}
                itemStyle={styles.item}
                itemLabelStyle={styles.itemLabel}
                itemStyleSelected={styles.itemSelected}
                itemLabelStyleSelected={styles.itemLabelSelected}
                onItemPress={() => this.setState({cuisines: this.cuisineTag.itemsSelected})} />
            </View>

            <Text style={styles.label}>WHAT ARE YOU ALLERGIC TO?</Text>
            <View style={styles.selectContainer}>
              <TagSelect
                data={allergyOptions}
                value={this.state.allergies}
                ref={(tag) => {
                  this.allergyTag = tag;
                }}
                itemStyle={styles.item}
                itemLabelStyle={styles.itemLabel}
                itemStyleSelected={styles.itemSelected2}
                itemLabelStyleSelected={styles.itemLabelSelected}
                onItemPress={() => this.setState({allergies: this.allergyTag.itemsSelected})} />
            </View>

          <Text style={styles.label}>OTHER ALLERGIES</Text>
          <TextInput value={this.state.otherAllergy} style={styles.input}/>

          <Text style={styles.label}>HOW IMPORTANT ARE THE FOLLOWING TO YOU IN CHOOSING WHERE TO EAT?</Text>
          <View style={styles.sublabel}>
            <Text>Popularity</Text>
            <RNPickerSelect
              items={ratingOptions}
              placeholder={{
                label: 'Unrated',
                value: 0,
              }}
              onValueChange={popularity => this.setState({popularityRating: popularity.value})}
              style={{ ...pickerSelectStyles2 }}
              value={this.state.popularityRating} />
          </View>
          <View style={styles.sublabel}>
            <Text>High Rating</Text>
            <RNPickerSelect
              items={ratingOptions}
              placeholder={{
                label: 'Unrated',
                value: 0,
              }}
              onValueChange={rating => this.setState({ratingRating: rating.value})}
              style={{ ...pickerSelectStyles2 }}
              value={this.state.ratingRating} />
          </View>
          <View style={styles.sublabel}>
            <Text>Proximity</Text>
            <RNPickerSelect
              items={ratingOptions}
              placeholder={{
                label: 'Unrated',
                value: 0,
              }}
              onValueChange={proximity => this.setState({proximityRating: proximity.value})}
              style={{ ...pickerSelectStyles2 }}
              value={this.state.proximityRating} />
          </View>
          <View style={styles.sublabel}>
            <Text>Ambiance</Text>
            <RNPickerSelect
              items={ratingOptions}
              placeholder={{
                label: 'Unrated',
                value: 0,
              }}
              onValueChange={ambiance => this.setState({ambianceRating: ambiance.value})}
              style={{ ...pickerSelectStyles2 }}
              value={this.state.ambianceRating} />
          </View>
          <View style={styles.sublabel}>
            <Text>Menu Variety</Text>
            <RNPickerSelect
              items={ratingOptions}
              placeholder={{
                label: 'Unrated',
                value: 0,
              }}
              onValueChange={menu => this.setState({menuRating: menu.value})}
              style={{ ...pickerSelectStyles2 }}
              value={this.state.menuRating} />
          </View>

          <TouchableOpacity style={styles.button} onPress={ () => this.updatePreference() }>
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
  keyboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: '10%'
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
    marginVertical: 5
  },
  selectContainer: {
    paddingTop: 10,
    paddingLeft: 10
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
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
  },
  itemLabel: {
    color: '#333'
  },
  itemSelected: {
    backgroundColor: iOSColors.green,
    borderColor: iOSColors.green,    
  },
  itemSelected2: {
    backgroundColor: iOSColors.red,
    borderColor: iOSColors.red,    
  },
  itemLabelSelected: {
    color: 'white',
  },
  sublabel: {
    width: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingLeft: 10, 
    marginBottom: 5
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
    marginTop: 5,
    marginBottom: 5
  },
});

const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#999999',
    color: 'black',
    width: 200,
    borderRadius: 10,
    marginTop: 5
  },
});