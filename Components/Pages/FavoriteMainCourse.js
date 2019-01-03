import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';

export default class FavoriteMainCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        refreshing: false,
    }
}
static navigationOptions = {
   title: "Favorit - Hovedret",
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
favoritArray = [];
  
componentWillMount(){
    this.getFavoritsMainCourse();
}
componentDidMount(){
        this.getRecipeFromApiAsync();
  }

//Get the maincourses on firebase from user and if true added to favoritArray
getFavoritsMainCourse() {
    var that = this;
    return firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/mainCourse`).on('value', function (snapshot) {
        var mainCourses = Object.values(snapshot.val());
        for(let i = 0; i < mainCourses.length; i++) {
            if(mainCourses[i].value === true) {
                that.favoritArray.push(mainCourses[i].name);
            }
        }
    });
}

//Gets the recipes from Firebase and add the matching ones from
//favoritArray to opskrifter. 
getRecipeFromApiAsync() {
  var that = this;
  var opskrifter = [];
    return firebase.database().ref('opskrifter/mainCourse').on('value', function (snapshot) {
      var data = Object.values(snapshot.val());
      for (let i=0; i < that.favoritArray.length; i++) {
          Object.keys(data).forEach(function(key) {
              if (that.favoritArray[i] === data[key].intro.id) {
                opskrifter.push(data[key])
              }
          });
      } 
     that.setState({
        isLoading: false,
        dataSource: opskrifter,
        refreshing: false,
        });

    });
}

//Refresh function, swipe down in flatList, empties the favoritArray and runs getFanoritsDessert
//and getRecipeFromApiAsync.
handleRefresh = () => {
    this.setState ({
        refreshing: true,
        
    }, 
    () => {
        this.favoritArray = [];
        this.getFavoritsMainCourse();
        this.getRecipeFromApiAsync();


    })
};

//Loads the flatList with the recipes from dataSource.
    render() {
        
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
         onPress={() => this.props.navigation.navigate('Recipe', {
            recipe: item
        })}
         containerStyle={{backgroundColor: 'white'}}
         />
    }
        keyExtractor={(item, index) => index.toString()}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        />
        );
    }
}