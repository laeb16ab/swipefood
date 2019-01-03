import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { header, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import FavoriteDessert from './FavoriteDessert';
import FavoriteStarter from './FavoriteStarter';
import FavoriteMainCourse from './FavoriteMainCourse';

const FavoriteStarterStack = createStackNavigator({
  Forret: {screen: FavoriteStarter},
});

const FavoriteMainCourseStack = createStackNavigator({
  Hovedret: { screen: FavoriteMainCourse},
});

const FavoriteDessertStack = createStackNavigator({
  Dessert: { screen: FavoriteDessert},
});

//Creates top and bottom navigationbar, inbetween the 
//Home.js top and bottom navigationbar. 
export default createBottomTabNavigator(
  {
    Forret: { screen: FavoriteStarterStack},
    Hovedret: { screen: FavoriteMainCourseStack},
    Dessert: { screen: FavoriteDessertStack},
  },

{
  navigationOptions: ({ navigation}) => ({

    tabBarIcon: ({ focused, tintColor }) => {

      const { routeName } = navigation.state;
      var iconName;

      if (routeName === 'Forret') {
        iconName = 'md-aperture';
      } 
      if (routeName === 'Hovedret') {
        iconName = 'md-pizza';
      }  
      else if (routeName === 'Dessert') {
          iconName = 'md-ice-cream';
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

