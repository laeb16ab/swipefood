import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';

export default class ProfileScreen extends React.Component {
  static navigationOption = {
   title: "Profile"    
  };

    render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
        <Text>ProfileScreen</Text>
        <Button title="Log ud" onPress={() => firebase.auth().signOut().then(() => alert("Du er nu logget ud"))}></Button>
      </View>
    );
  }
}