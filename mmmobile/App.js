import { StackNavigator } from 'react-navigation';
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import RecommendationHistoryScreen from './components/RecommendationHistoryScreen';
import ContentFeedScreen from './components/ContentFeedScreen';

export default StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Recommendation: {
    screen: RecommendationHistoryScreen,
  },
  ContentFeed: {
    screen: ContentFeedScreen,
  }
}, {initialRouteName: 'ContentFeed'});

