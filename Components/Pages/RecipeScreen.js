import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';

export default class RecipeScreen extends React.Component {
  static navigationOption = {
   title: "RecipeScreen"    
  };

    render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
        <Text>ProfileScreen</Text>
      </View>
    );
  }
}