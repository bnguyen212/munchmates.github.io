import { StackNavigator } from 'react-navigation';
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import RecommendationsHistoryScreen from './components/RecommendationsHistoryScreen';
import ContentFeedScreen from './components/ContentFeedScreen';
import ProfileScreen from './components/ProfileScreen';
import UpdateProfileScreen from './components/UpdateProfileScreen';
import FavoritesScreen from './components/FavoritesScreen';
import MapScreen from './components/MapScreen';
import PreferencesScreen from './components/PreferencesScreen';
import testScreen from './components/test';

export default StackNavigator({
  Welcome: {
    screen: WelcomeScreen
  },
  Register: {
    screen: RegisterScreen
  },
  Login: {
    screen: LoginScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Map: {
    screen: MapScreen
  },
  ContentFeed: {
    screen: ContentFeedScreen
  },
  UpdateProfile: {
    screen: UpdateProfileScreen
  },
  Favorites: {
    screen: FavoritesScreen
  },
  RecommendationsHistory: {
    screen: RecommendationsHistoryScreen
  },
  Preferences: {
    screen: PreferencesScreen
  },
}, {initialRouteName: 'Login'});

