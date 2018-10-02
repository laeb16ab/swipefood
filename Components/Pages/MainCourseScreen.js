import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class MainCourseScreen extends React.Component {
  static navigationOption = {
   title: "MainCourse"    
  };

    render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
        <Text>MainCourseScreen</Text>
      </View>
    );
  }
}