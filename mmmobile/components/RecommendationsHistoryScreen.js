import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import VendorCard from './VendorCard';

export default class RecommendationsHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {recs: [{title: 'Panda Express', time: new Date(), image: 'http://logonoid.com/images/panda-express-logo.png', desc: 'Panda Express is a fast casual restaurant chain which serves American Chinese cuisine.'},
                         {title: 'Chick-fil-A', time: new Date(), image: 'https://35ht6t2ynx0p1ztf961h81r1-wpengine.netdna-ssl.com/wp-content/uploads/2015/01/BODY-chickfila-logo-600x399.jpg', desc: 'Chick-fil-A is an American fast food restaurant chain specializing in chicken sandwiches.'},
                         {title: 'Burger King', time: new Date(), image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Burger_King_Logo.svg/1024px-Burger_King_Logo.svg.png', desc: 'Burger King is an American global chain of hamburger fast food restaurants.'},
                         {title: 'Popeyes', time: new Date(), image: 'http://restaurantnewsrelease.com/wp-content/uploads/2017/03/Cheryl-Bachelder-to-Step-Down-as-CEO-of-Popeyes-Louisiana-Kitchen-Upon-Closing-of-Transaction-with-Restaurant-Brands-International.gif', desc: 'Popeyes is an American multinational chain of fried chicken fast food restaurants.'},
                         {title: 'Panda Express', time: new Date(), image: 'http://logonoid.com/images/panda-express-logo.png', desc: 'Panda Express is a fast casual restaurant chain which serves American Chinese cuisine.'},
                         {title: 'Chick-fil-A', time: new Date(), image: 'https://35ht6t2ynx0p1ztf961h81r1-wpengine.netdna-ssl.com/wp-content/uploads/2015/01/BODY-chickfila-logo-600x399.jpg', desc: 'Chick-fil-A is an American fast food restaurant chain specializing in chicken sandwiches.'},
                         {title: 'Burger King', time: new Date(), image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Burger_King_Logo.svg/1024px-Burger_King_Logo.svg.png', desc: 'Burger King is an American global chain of hamburger fast food restaurants.'},
                         {title: 'Popeyes', time: new Date(), image: 'http://restaurantnewsrelease.com/wp-content/uploads/2017/03/Cheryl-Bachelder-to-Step-Down-as-CEO-of-Popeyes-Louisiana-Kitchen-Upon-Closing-of-Transaction-with-Restaurant-Brands-International.gif', desc: 'Popeyes is an American multinational chain of fried chicken fast food restaurants.'},
                         {title: 'Panda Express', time: new Date(), image: 'http://logonoid.com/images/panda-express-logo.png', desc: 'Panda Express is a fast casual restaurant chain which serves American Chinese cuisine.'},
                         {title: 'Chick-fil-A', time: new Date(), image: 'https://35ht6t2ynx0p1ztf961h81r1-wpengine.netdna-ssl.com/wp-content/uploads/2015/01/BODY-chickfila-logo-600x399.jpg', desc: 'Chick-fil-A is an American fast food restaurant chain specializing in chicken sandwiches.'},
                         {title: 'Burger King', time: new Date(), image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Burger_King_Logo.svg/1024px-Burger_King_Logo.svg.png', desc: 'Burger King is an American global chain of hamburger fast food restaurants.'},
                         {title: 'Popeyes', time: new Date(), image: 'http://restaurantnewsrelease.com/wp-content/uploads/2017/03/Cheryl-Bachelder-to-Step-Down-as-CEO-of-Popeyes-Louisiana-Kitchen-Upon-Closing-of-Transaction-with-Restaurant-Brands-International.gif', desc: 'Popeyes is an American multinational chain of fried chicken fast food restaurants.'}]}
  }
  static navigationOptions = (props) => ({
    title: 'Recommendations History',
    gesturesEnabled: false,
  });

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.recs.map((item, i) => <VendorCard key={i} rec={item} />)}
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