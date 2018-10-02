import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class FavoriteScreen extends React.Component {
  static navigationOption = {
   title: "Favorite"    
  };

    render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
        <Text>FavoriteScreen</Text>
      </View>
    );
  }
}