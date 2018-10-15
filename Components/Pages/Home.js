import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import Top5Screen from './Top5Screen';
import ProfileScreen from './ProfileScreen';
import FavoriteScreen from './FavoriteScreen';

const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
});

const Top5Stack = createStackNavigator({
  Top5: { screen: Top5Screen},
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen},
});

const FavoriteStack = createStackNavigator({
  Favorite: { screen: FavoriteScreen},
});

export default createBottomTabNavigator(
  {
    Hjem: { screen: HomeStack},
    Top5: { screen: Top5Stack},
    Favorit: { screen: FavoriteStack},
    Profil: { screen: ProfileStack },
  },

{

  navigationOptions: ({ navigation}) => ({
  
    tabBarIcon: ({ focused, tintColor }) => {

      const { routeName } = navigation.state;
      var iconName;

      if (routeName === 'Hjem') {
        iconName = 'md-home';
      } 
      if (routeName === 'Top5') {
        iconName = 'md-trophy';
      } 
      if (routeName === 'Favorit') {
        iconName = 'md-heart';
      } 
      if (routeName === 'Forret') {
        iconName = 'md-aperture';
      }
      if (routeName === 'Hovedret') {
        iconName = 'md-pizza';
      } 
      if (routeName === 'Dessert') {
        iconName = 'md-ice-cream';
      }  
      else if (routeName === 'Profil') {
          iconName = 'md-contact';
        }
        return <Ionicons name={iconName} size={25} color={tintColor}/>;
      },
      
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
   },
 }
);

