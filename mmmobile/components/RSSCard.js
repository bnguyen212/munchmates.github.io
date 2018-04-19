import React, { Component } from 'react';
import { StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button } from 'react-native';
import moment from 'moment';
import cheerio from 'react-native-cheerio';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class RSSCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = new Date();
    date.setFullYear(this.props.feed.pubDate.slice(0,4));
    date.setMonth(this.props.feed.pubDate.slice(5,7));
    date.setDate(this.props.feed.pubDate.slice(8, 10))
    const $ = cheerio.load(this.props.feed.description);
    const desc = $('p').first().text();
    console.log(desc);
    return (
      <View style={styles.card}>
        <Image source={{uri: 'https://static1.squarespace.com/static/511b2ccce4b0f4197c11661c/t/57393c8d1d07c093e2806269/1463368856675/Brenda+Ton'}} style={[styles.image, styles.author]}/>

        <Image source={{uri: this.props.feed.thumbnail}} style={styles.image}/>

        <Text style={styles.title}>{this.props.feed.title}</Text>

        <Text style={styles.time}>by {this.props.feed.author} on {moment(date, 'YYYY-MM-DDThh:mm:ss.SSSZ').format("MMMM D, YYYY")}</Text>

        <ScrollView style={styles.descContainer}>
          <Text style={styles.desc}>{desc}</Text>
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity><Icon name="thumb-up" size={30} color='black'/></TouchableOpacity>
          <TouchableOpacity><Icon name="message" size={30} color='black'/></TouchableOpacity>
          <TouchableOpacity><Icon name="share" size={30} color='black'/></TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 30,
    marginHorizontal: '2.5%',
    width: '95%',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    height: 450,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  author: {
    zIndex: 10,
    position: 'absolute',
    top: '-10%',
    left: '2%',
    width: '25%',
    height: '22%',
    borderColor: 'white',
    borderRadius: 43,
    borderWidth: 7
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 2,
    marginBottom: 10
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  time: {
    fontStyle: 'italic',
    textAlign: 'right',
    fontSize: 10
  },
  descContainer: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 5,
    marginBottom: 20
  },
  desc: {
    textAlign: 'justify',
    marginBottom: 10
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})