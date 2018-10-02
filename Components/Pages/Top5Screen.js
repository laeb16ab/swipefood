import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Top5Screen extends React.Component {
  static navigationOption = {
   title: "Top5"    
  };

    render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
        <Text>Top5Screen</Text>
      </View>
    );
  }
}