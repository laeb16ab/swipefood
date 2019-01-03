import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {Image, StyleSheet} from 'react-native';
import HomeScreen from './HomeScreen';
import Top5Screen from './Top5Screen';
import ProfileScreen from './ProfileScreen';
import FavoriteScreen from './FavoriteScreen';
import RecipeScreen from './RecipeScreen';
import TopRecipeScreen from './TopRecipeScreen';
import SwipeRecipe from './SwipeRecipe';

//Creates the stacks for Home, Top5, Profile and Favorite.
//Adds the logo to the headerbar.
const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
  SwipeRecipe: {screen: SwipeRecipe},
  
},
{ navigationOptions: {
  headerBackground: (
  <Image
    style={{flex: 1,  justifyContent: "center", alignItems: "center",  resizeMode: 'contain'}}
    source={{ uri: 'https://i.imgur.com/bap6ITX.png' }}
  />
)}
});

const Top5Stack = createStackNavigator({
  Top5: { screen: Top5Screen},
  Recipe: { screen: TopRecipeScreen},
},
{ navigationOptions: {
  headerBackground: (
  <Image
    style={{flex: 1,  justifyContent: "center", alignItems: "center",  resizeMode: 'contain'}}
    source={{ uri: 'https://i.imgur.com/bap6ITX.png' }}
  />
)}
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen},
},
{ navigationOptions: {
  headerBackground: (
  <Image
    style={{flex: 1,  justifyContent: "center", alignItems: "center",  resizeMode: 'contain'}}
    source={{ uri: 'https://i.imgur.com/bap6ITX.png' }}
  />
)}
});

const FavoriteStack = createStackNavigator({
  Favorite: { screen: FavoriteScreen},
  Recipe: { screen: RecipeScreen},
},
{ navigationOptions: {
  headerBackground: (
  <Image
    style={{flex: 1,  justifyContent: "center", alignItems: "center",  resizeMode: 'contain'}}
    source={{ uri: 'https://i.imgur.com/bap6ITX.png' }}
  />
)}
});

export default createBottomTabNavigator(
  {
    Profil: { screen: ProfileStack },
    Søg: { screen: HomeStack},
    Top5: { screen: Top5Stack},
    Favorit: { screen: FavoriteStack},
    
  },

{
  
  //Adds icons to the bottomnavigationbar.
  navigationOptions: ({ navigation}) => ({
      
    tabBarIcon: ({ focused, tintColor }) => {

      const { routeName } = navigation.state;
      var iconName;

      if (routeName === 'Søg') {
        iconName = 'md-search';
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

  //Decides the icon color wheater it is active or inactive. 
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
   },
  }
);

