import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import RSSCard from './RSSCard';
import { iOSColors, sanFranciscoWeights } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ContentFeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {feed: []}

    this.blogs = ['http://bitesandbourbon.com/blog?format=RSS', 'https://www.snixykitchen.com/feed/', 'http://www.abrowntable.com/home?format=RSS']
  }

  static navigationOptions = (props) => ({
    title: 'Content Feed',
    gesturesEnabled: false,
  });

  componentWillMount() {
    let feed = [];
    fetch('https://api.rss2json.com/v1/api.json?rss_url=' + this.blogs[0])
    .then(res => res.json())
    .then(res => {
      feed = feed.concat(res.items)
      return fetch('https://api.rss2json.com/v1/api.json?rss_url=' + this.blogs[1])
    })
    .then(res => res.json())
    .then(res => {
      feed = feed.concat(res.items)
      return fetch('https://api.rss2json.com/v1/api.json?rss_url=' + this.blogs[2])
    })
    .then(res => res.json())
    .then(res => {
      feed = feed.concat(res.items)
      return feed
    })
    .then(feed => {
      feed.sort((a,b) => {
        let dateA = new Date(a.pubDate.slice(0,10));
        let dateB = new Date(b.pubDate.slice(0,10));
        return dateB - dateA
      });
      this.setState({feed});
    })


    // Promise.all(this.blogs.map(blog => fetch('https://api.rss2json.com/v1/api.json?rss_url=' + blog)))
    // .then(responses => {
    //   console.log(responses);
    //   return responses.map(res => res.json())
    // })
    // .then(arr => {
    //   console.log(arr);
    //   arr.map(blog => feed.concat(blog.items));
    //   console.log(feed);
    // })

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