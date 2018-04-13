import { StackNavigator } from 'react-navigation';
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';


export default StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Login: {
    screen: LoginScreen,
  }
  Home: {
    screen: HomeScreen
  }
}, {initialRouteName: 'Welcome'});
