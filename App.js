import React from 'react';
import {Button, Text, View, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './Components/Pages/HomeScreen';
import StarterScreen from './Components/Pages/StarterScreen';
import Top5Screen from './Components/Pages/Top5Screen';
import MainCourseScreen from './Components/Pages/MainCourseScreen';
import DessertScreen from './Components/Pages/DessertScreen';
import ProfileScreen from './Components/Pages/ProfileScreen';
import FavoriteScreen from './Components/Pages/FavoriteScreen';


const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
});
const StarterStack = createStackNavigator({
  Starter: { screen: StarterScreen},
});
const Top5Stack = createStackNavigator({
  Top5: { screen: Top5Screen},
});
const MainCourseStack = createStackNavigator({
  MainCourse: { screen: MainCourseScreen},
});
const DessertStack = createStackNavigator({
  Dessert: { screen: DessertScreen},
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
    Favorit: { screen: FavoriteScreen},
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