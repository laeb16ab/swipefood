import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';

export default class FavoriteStarter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        refreshing: false,
    }
}

static navigationOptions = {
   title: 'Favorit - Forret',
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
    this.getFavoritsStarter();
}
componentDidMount(){
    this.getRecipeFromApiAsync();
}

//Get the starters on firebase from user and if true added to favoritArray
getFavoritsStarter() {
    var that = this;
    return firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/starter`).on('value', function (snapshot) {
        var starters = Object.values(snapshot.val());
        for(let i = 0; i < starters.length; i++) {
            if(starters[i].value === true) {
                that.favoritArray.push(starters[i].name);
            }
        }
    });
   
}

//Gets the recipes from Firebase and add the matching ones from
//favoritArray to opskrifter.
getRecipeFromApiAsync() {
  var that = this;
  var opskrifter = [];
    return firebase.database().ref('opskrifter/starter').on('value', function (snapshot) {
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
        this.getFavoritsStarter();
        this.getRecipeFromApiAsync();
    })
}

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