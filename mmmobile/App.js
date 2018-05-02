import { StackNavigator } from 'react-navigation';
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';

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
    screen: HomeScreen
  }
}, {initialRouteName: 'Welcome'});
