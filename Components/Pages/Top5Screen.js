import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Top5Dessert from './Top5Dessert';
import Top5Starter from './Top5Starter';
import Top5MainCourse from './Top5MainCourse';

//Creates top and bottom navigationbar, inbetween the 
//Home.js top and bottom navigationbar. 
const Top5StarterStack = createStackNavigator({
  Forret: {screen: Top5Starter},
});

const Top5MainCourseStack = createStackNavigator({
  Hovedret: { screen: Top5MainCourse},
});

const Top5DessertStack = createStackNavigator({
  Dessert: { screen: Top5Dessert},
});

export default createBottomTabNavigator(
  {
    Forret: { screen: Top5StarterStack},
    Hovedret: { screen: Top5MainCourseStack},
    Dessert: { screen: Top5DessertStack},
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

