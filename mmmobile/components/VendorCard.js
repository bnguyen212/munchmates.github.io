import React, { Component } from 'react';
import { StyleSheet,
  View,
  Text,
  Image,
  ScrollView } from 'react-native';
import moment from 'moment';

export default class VendorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
            <Text style={styles.title}>{this.props.rec.title}</Text>
            <Text style={styles.time}>{moment(this.props.rec.time, 'YYYY-MM-DDThh:mm:ss.SSSZ').format("MMMM D, YYYY")}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image source={{uri: this.props.rec.image}} style={styles.image}/>
          </View>
          <ScrollView style={styles.descContainer} bounces={false}>
            <Text style={styles.desc}>{this.props.rec.desc}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: '2.5%',
    width: '95%',
    padding: 10,
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  header: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  time: {
    fontStyle: 'italic',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 0.7,
    marginRight: 2,
    height: "85%"
  },
  descContainer: {
    flex: 0.3,
    marginLeft: 2,
    padding: 5,
  },
  desc: {
    textAlign: 'justify'
  },
  image: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  }
})