import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, Button } from 'react-native';
import fridge from '../Images/fridge.jpg';
import findRecipe from '../Images/FindRecipe.jpg';
import findFavorite from '../Images/FindFavorite.jpg';
import favorit from '../Images/favorit.jpg';
import settings from '../Images/settings.png';
import addRecipe from '../Images/AddRecipe.png';

export default class HomeScreen extends React.Component {
  static navigationOption = {
   title: "Home"    
  };

    render() {
    return (
      <View style={styles.parentView}>
        <View style={styles.childView}>
          <TouchableOpacity style={styles.childView} onPress={() => alert ("Under konstruktion")}>
            <Image style={styles.imageView} source={fridge} />
          </TouchableOpacity>         
          <TouchableOpacity style={styles.childView} onPress={() => alert ("Under konstruktion")}>
            <Image style={styles.imageView} source={findRecipe}/>
          </TouchableOpacity>
        </View>
        <View style={styles.childView}>
          <TouchableOpacity style={styles.childView} onPress={() => alert ("Under konstruktion")}>
            <Image style={styles.imageView} source={findFavorite}/>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.childView} onPress={() => alert ("Under konstruktion")}>
            <Image style={styles.imageView} source={favorit}/>
          </TouchableOpacity> 
        </View>
        <View style={styles.childView}>
          <TouchableOpacity style={styles.childView} onPress={() => alert ("Under konstruktion")}>
            <Image style={styles.imageView} source={settings}/>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.childView} onPress={() => alert ("Under konstruktion")}>
            <Image style={styles.imageView} source={addRecipe}/>
          </TouchableOpacity> 
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor:'white', 
  },
  childView: {
    flex:1,
    flexDirection: 'row',
    padding: 2,
  },
  imageView: {
    flex:1,
   height: '100%',
   width: '100%', 
   resizeMode: 'contain',
  }
})