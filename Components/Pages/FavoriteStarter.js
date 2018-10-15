import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';

export default class FavoriteStarter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true
    }
}
static navigationOption = {
   title: "Starter"    
  };
   
componentDidMount(){
    this.getRecipeFromApiAsync();
}

getRecipeFromApiAsync() {
  var that = this;
    return firebase.database().ref('opskrifter/starter').on('value', function (snapshot) {
      var opskrifter = Object.values(snapshot.val());
         that.setState({
            isLoading: false,
            dataSource: opskrifter,
        });
      });
    }

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
         onPress={() => alert ( "Opskrift trykket på: " + item.intro.overskrift + "\n")}
         containerStyle={{backgroundColor: 'white'}}
         />
    }
        keyExtractor={(item, index) => index.toString()}
        />
        );
    }
}