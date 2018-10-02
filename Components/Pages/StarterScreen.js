import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class StarterScreen extends React.Component {
  static navigationOption = {
   title: "Starter"    
  };

    render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
        <Text>StarterScreen</Text>
      </View>
    );
  }
}