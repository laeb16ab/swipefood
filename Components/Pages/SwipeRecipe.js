import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ListItem, Icon, Button} from 'react-native-elements';
import firebase from 'firebase';

export default class SwipeRecipe extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
        isLoading: true,
        indexKey: 0,
        recipeId: null,
        recipeLike: 0
        
    }
}
static navigationOptions = {
   title: '',    
  };

componentWillMount(){
    this.getRecipeFromApiAsync();
}

componentDidUpdate(indexKey) {
    
    if(this.state.indexKey !== this.state.indexKey) {
   }
}

getRecipeFromApiAsync() {
  var that = this;
  var mealkey = this.props.navigation.getParam( 'mealKey' );

    firebase.database().ref(`opskrifter/${mealkey}`).on('value', function (snapshot) {
      var opskrifter = Object.values(snapshot.val());
         that.setState({
            isLoading: false,
            dataSource: opskrifter,
        });
        
      });
    }

    //Adds the recipe to the "like-list" in Firebase
likeRecipe() {
    var mealkey = this.props.navigation.getParam( 'mealKey' );
    var index = this.state.indexKey;
    var indexName = this.state.dataSource[index].intro.id
    var ref = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/${mealkey}/${indexName}`)
    var obj = { 
        value: true 
    }
    ref.update(obj)   
this.updateLikes()
index++ 
this.setState ({
    indexKey: index
})
  }  
    
updateLikes() {
    var mealkey = this.props.navigation.getParam( 'mealKey' );
    var indexKey = this.state.indexKey;
    var likes = this.state.dataSource[indexKey].intro.likes;
    var indexName = this.state.dataSource[indexKey].intro.id;
    var newLikes = likes+1;
    var ref = firebase.database().ref(`opskrifter/${mealkey}/${indexName}/intro/`)
    console.log(newLikes);
    var obj = { 
        likes: newLikes 
    }
    ref.update(obj)   
}

    //Adds the recipe to the "do-not-like-list" in Firebase
dislikeRecipe() {
    var mealkey = this.props.navigation.getParam( 'mealKey' );
    var index = this.state.indexKey;
    var indexName = this.state.dataSource[index].intro.id
    var ref = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/${mealkey}/${indexName}`)
    var obj = { 
        value: false 
    }
    ref.update(obj)   
    index++ 
    this.setState ({
        indexKey: index
    })
  }  


    render() {
        
        if(this.state.isLoading) {
            return <ActivityIndicator size='small' />
        }
    return (
        
        <ScrollView style={{backgroundColor: 'white'}}>
          <View>
            <View >
                <Image  style={{width: '100%', height: 200, alignContent: 'flex-start', justifyContent: 'flex-start'}}
                        source={{ uri: this.state.dataSource[this.state.indexKey].intro.billede}} />
                
            </View>
            <View style={styles.childView}>
                <View style={{width:'78%'}}>
                    <Text style={styles.HeaderFont}>{this.state.dataSource[this.state.indexKey].intro.overskrift}</Text>
                </View>
                <View style={{width:'22%'}}>
                    <View style={styles.childView}>
                        <Icon active name='timer' size={20} /> 
                        <Text>{this.state.dataSource[this.state.indexKey].intro.tid} min.</Text>
                    </View>
                    <View style={styles.childView}>
                        <Icon active name='group' size={20} /> 
                        <Text>{this.state.dataSource[this.state.indexKey].intro.personer} pers.</Text>
                    </View>
                </View>
            </View>
            <View style={styles.childView}>
                <Text>{this.state.dataSource[this.state.indexKey].intro.underOverskrift}</Text>
            </View>
          </View>
            <View style={styles.buttonView}> 
            <View style={styles.buttonView}/>  
            <View style={styles.buttonContainer}>     
            <Icon 
            active name='clear' 
            size={50} 
            color='red'
          onPress={() => this.dislikeRecipe()}/>
           </View>
           <View style={{width: 20}}/> 
           <View style={styles.buttonContainer}>
           <Icon 
           active name='favorite' 
           size={50}
           color='green'
           
          onPress={() => this.likeRecipe()}/>
          </View>
          <View style={styles.buttonView}/> 
          </View>
        </ScrollView>
    )}
}
const styles = StyleSheet.create({
    childView: {
      flex:1,
      flexDirection: 'row',
      padding: 2,
      alignItems: 'center',
      marginLeft: 2,
      marginRight: 2,
      
    },
    buttonView: {
        flex:1,
        flexDirection: 'row',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginLeft: 2,
        marginRight: 2,
      },
      buttonContainer: {
        
        flexDirection: 'row',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 50, 
        borderWidth: 5, 
        borderColor: '#f5f5f0'
      },
    HeaderFont: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    subHeaderFont: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'italic',
        fontFamily: 'BradleyHandITCTT-Bold'
    }
})