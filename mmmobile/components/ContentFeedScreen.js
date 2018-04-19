import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
// import Recommendation from './Recommendation';
import RSSCard from './RSSCard';

export default class ContentFeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {feed: []}
  }
  static navigationOptions = (props) => ({
    title: 'Content Feed'
  });

  componentWillMount() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://bitesandbourbon.com/blog?format=RSS')
    .then(res => res.json())
    .then(rss => this.setState({feed: rss.items}))
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.feed.map(item => <RSSCard feed={item} key={item.guid} />)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: '10%'
  }
});