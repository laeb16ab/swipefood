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
                    <Text style={styles.HeaderFont}>{recipe.intro.overskrift}</Text>
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
            <View>
                <Text style={styles.subHeaderFont}>Ingredienser</Text>
                <FlatList>
                    <Text>Her skal ingredienserne loopes</Text>
                </FlatList>
            </View>
            <View>
                <Text style={styles.subHeaderFont}>Sådan gør du</Text>
                <FlatList>
                    <Text>Her skrives processen</Text>
                </FlatList>
            </View>
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