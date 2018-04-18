import { StackNavigator } from 'react-navigation';
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import RecommendationHistoryScreen from './components/RecommendationHistoryScreen';

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
  }
}, {initialRouteName: 'Recommendation'});

