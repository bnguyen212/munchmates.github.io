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
import { iOSColors } from 'react-native-typography';


export default class RSSCard extends Component {
  constructor(props) {
    super(props);
  }

  profilePic(value) {
    let url;
    switch (value) {
      case 'Brenda Ton':
        url = 'https://static1.squarespace.com/static/511b2ccce4b0f4197c11661c/t/57393c8d1d07c093e2806269/1463368856675/Brenda+Ton';
        break;
      case 'Nik Sharma':
        url = 'https://static1.squarespace.com/static/53c2f8afe4b00a113d59f23a/t/572b500559827e91950d2d3f/1462456335185/Nik+Sharma.jpg?format=200w';
        break;
    }
    return url
  }

  render() {
    let date = new Date(this.props.feed.pubDate.slice(0,10));
    const $ = cheerio.load(this.props.feed.description);
    const desc = $('p').first().text();
    return (
      <View style={styles.card}>
        <Image source={{uri: this.profilePic(this.props.feed.author)}} style={[styles.image, styles.author]}/>

        <Image source={{uri: this.props.feed.thumbnail}} style={styles.image}/>

        <Text style={styles.title}>{this.props.feed.title}</Text>

        <Text style={styles.time}>by {this.props.feed.author} on {moment(date, 'YYYY-MM-DDThh:mm:ss.SSSZ').format("MMMM D, YYYY")}</Text>

        <ScrollView style={styles.descContainer}>
          <Text style={styles.desc}>{desc}</Text>
        </ScrollView>

        <View style={styles.tags}>
          {this.props.feed.categories.map((cat,i) => (
            <TouchableOpacity key={i}><Text style={{color: iOSColors.tealBlue, fontWeight: 'bold', padding: 5}}>{'#' +cat}</Text></TouchableOpacity>
            ))
          }
        </View>

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
    marginTop: 60,
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
    marginBottom: 10
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
  tags: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap'
  }
})