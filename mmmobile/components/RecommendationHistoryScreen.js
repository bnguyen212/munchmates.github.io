import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Recommendation from './Recommendation';

export default class RecommendationHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {recs: [{title: 'Panda Express', time: new Date(), image: 'background1.jpg', desc: 'Panda Express is a fast casual restaurant chain which serves American Chinese cuisine.'},
                         {title: 'Chick-fil-A', time: new Date(), image: 'background1.jpg', desc: 'Chick-fil-A is an American fast food restaurant chain specializing in chicken sandwiches.'},
                         {title: 'Burger King', time: new Date(), image: 'background1.jpg', desc: 'Burger King is an American global chain of hamburger fast food restaurants.'},
                         {title: 'Popeyes', time: new Date(), image: 'background1.jpg', desc: 'Popeyes is an American multinational chain of fried chicken fast food restaurants.'},
                         {title: 'Panda Express', time: new Date(), image: 'background1.jpg', desc: 'Panda Express is a fast casual restaurant chain which serves American Chinese cuisine.'},
                         {title: 'Chick-fil-A', time: new Date(), image: 'background1.jpg', desc: 'Chick-fil-A is an American fast food restaurant chain specializing in chicken sandwiches.'},
                         {title: 'Burger King', time: new Date(), image: 'background1.jpg', desc: 'Burger King is an American global chain of hamburger fast food restaurants.'},
                         {title: 'Popeyes', time: new Date(), image: 'background1.jpg', desc: 'Popeyes is an American multinational chain of fried chicken fast food restaurants.'},
                         {title: 'Panda Express', time: new Date(), image: 'background1.jpg', desc: 'Panda Express is a fast casual restaurant chain which serves American Chinese cuisine.'},
                         {title: 'Chick-fil-A', time: new Date(), image: 'background1.jpg', desc: 'Chick-fil-A is an American fast food restaurant chain specializing in chicken sandwiches.'},
                         {title: 'Burger King', time: new Date(), image: 'background1.jpg', desc: 'Burger King is an American global chain of hamburger fast food restaurants.'},
                         {title: 'Popeyes', time: new Date(), image: 'background1.jpg', desc: 'Popeyes is an American multinational chain of fried chicken fast food restaurants.'}]}
  }
  static navigationOptions = (props) => ({
    title: 'Top Recommendations History'
  });

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.recs.map((item, i) => <Recommendation key={i} rec={item} />)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20
  }
});