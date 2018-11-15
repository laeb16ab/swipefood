import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';

export default class Top5MainCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true
    }
}
static navigationOptions = {
   title: "Top 5 - Hovedret",
   headerStyle: {
     backgroundColor: 'red',
     height: 25,
   },
   headerTintColor: 'white',
   headerTitleStyle: {
     fontWeight: 'bold',
     justifyContent: 'center',
   },      
  };
   
componentDidMount(){
    this.getRecipeFromApiAsync();
}

//Gets mainCourse recipes from Firebase and sort by likes.
getRecipeFromApiAsync() {
  var that = this;
    return firebase.database().ref('opskrifter/mainCourse').on('value', function (snapshot) {
      var opskrifter = Object.values(snapshot.val());
      opskrifter.sort(function(a,b) {
          return parseInt(b.intro.likes) - parseInt(a.intro.likes);
      })
         that.setState({
            isLoading: false,
            dataSource: opskrifter,
        });
      });
    }
   

    render() {
        console.log(this.state.dataSource);
        if (this.setState.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }
    return (
     
      <FlatList
        data={this.state.dataSource}
        renderItem={({item}) =>
        <ListItem
         avatar={
             <Image
             style={{width: 65, height: 65}}
             source={{ uri: item.intro.billede}} />
         }
         title={item.intro.overskrift}
         titleStyle={{color: 'tomato', fontWeight: 'bold'}}
         subtitleStyle={{color: 'tomato'}}
         subtitle={item.intro.underOverskrift}
         chevronColor='tomato'  
         badge={{ value: item.intro.likes, textStyle: { color: 'white' }, containerStyle: { backgroundColor: 'red' } }}
         onPress={() => this.props.navigation.navigate('Recipe', {
            recipe: item
        })}
         containerStyle={{backgroundColor: 'white'}}
         />
    }
        keyExtractor={(item, index) => index.toString()}
        />
        );
    }
}