import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOption = {
   title: "Home"    
  };

    render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}