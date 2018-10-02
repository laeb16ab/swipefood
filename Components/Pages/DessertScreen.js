import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class DessertScreen extends React.Component {
  static navigationOption = {
   title: "Dessert"    
  };

    render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
        <Text>DessertScreen</Text>
      </View>
    );
  }
}