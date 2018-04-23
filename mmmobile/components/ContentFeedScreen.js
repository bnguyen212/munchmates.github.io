import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import RSSCard from './RSSCard';
import { iOSColors, sanFranciscoWeights } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ContentFeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {feed: []}
  }

  static navigationOptions = (props) => ({
    title: 'Content Feed',
    gesturesEnabled: false,
  });

  componentWillMount() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://bitesandbourbon.com/blog?format=RSS')
    .then(res => res.json())
    .then(rss => this.setState({feed: rss.items}))
  }

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        {this.state.feed.map(item => <RSSCard feed={item} key={item.guid} />)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    height: '92.5%',
    marginBottom: '5%'
  },
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
});