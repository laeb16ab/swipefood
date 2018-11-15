import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ListItem, Icon} from 'react-native-elements';
import firebase from 'firebase';

export default class TopRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true
    }
}
static navigationOptions = {
   title: '',    
  };
   


    render() {
        const recipe = this.props.navigation.getParam( 'recipe' )
        
    return (
        <ScrollView style={{backgroundColor: 'white'}}>
          <View>
            <View >
                <Image  style={{width: '100%', height: 200, alignContent: 'flex-start', justifyContent: 'flex-start'}}
                        source={{ uri: recipe.intro.billede}} />
                
            </View>
            <View style={styles.childView}>
                <View style={{width:'78%'}}>
                    <Text style={styles.headerFont}>{recipe.intro.overskrift}</Text>
                </View>
                <View style={{width:'22%'}}>
                    <View style={styles.childView}>
                        <Icon active name='timer' size={20} /> 
                        <Text>{recipe.intro.tid} min.</Text>
                    </View>
                    <View style={styles.childView}>
                        <Icon active name='group' size={20} /> 
                        <Text>{recipe.intro.personer} pers.</Text>
                    </View>
                </View>
            </View>
            <View style={styles.childView}>
                <Text>{recipe.intro.underOverskrift}</Text>
            </View>
            <View style={{marginLeft: 5}}>
                <Text style={styles.subHeaderFont}>Ingredienser</Text> 
                {this.generateIngredient()}
            </View>
            <View style={{marginLeft: 5}}>
                <Text style={styles.subHeaderFont}>Sådan gør du</Text>         
                {this.generateHowTo()}
            </View>
          </View>
        </ScrollView>
    )}

    generateIngredient() {
        const recipe = this.props.navigation.getParam( 'recipe' );
        const ingredients = recipe.ingredienser;
        var ingredientComponents = [];
        
        for (var key in ingredients) {
           var step = ingredients[key];
            for (var keyLookingForLabel in step) {
                var ingredient = step[keyLookingForLabel];
                if(keyLookingForLabel === "label"){
                 ingredientComponents.push(
                    <Text style={styles.smallHeaderFont}>{ingredient}</Text>
                 );
                }
            }   
            
            for(var key in step) {
                var ingredient = step[key];
                if(key !== "label"){
                     ingredientComponents.push(
                        <Text>{ingredient.value} {ingredient.label}</Text>
                    );
                     }
            }
        }

        return (
            <View>
                {ingredientComponents}
            </View>
        )

    }

    generateHowTo() {
        const recipe = this.props.navigation.getParam( 'recipe' );
        const howTos = recipe.howTo;
        var howToComponents = [];
        console.log(howTos);
        
        for (var key in howTos) {
           var step = howTos[key];
            for (var keyLookingForLabel in step) {
                var howTo = step[keyLookingForLabel];
                if(keyLookingForLabel === "label"){
                    howToComponents.push(
                    <Text style={styles.smallHeaderFont}>{howTo}</Text>
                 );
                }
            }   
            
            for(var key in step) {
                var howTo = step[key];
                if(key !== "label"){
                    howToComponents.push(
                        <Text>{howTo.value}</Text>
                    );
                     }
            }
        }

        return (
            <View>
                {howToComponents}
            </View>
        )

    }

}

const styles = StyleSheet.create({
    childView: {
      flex:1,
      flexDirection: 'row',
      padding: 2,
      alignItems: 'center',
      marginLeft: 5,
      marginRight: 5,
      
    },
    headerFont: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    smallHeaderFont: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
    },
    subHeaderFont: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 5,
        fontStyle: 'italic',
        fontFamily: 'BradleyHandITCTT-Bold'
    }
})