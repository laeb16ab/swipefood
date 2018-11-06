import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, Button } from 'react-native';
import fridge from '../Images/fridge.jpg';
import findRecipe from '../Images/FindRecipe.jpg';
import findFavorite from '../Images/FindFavorite.jpg';
import favorit from '../Images/favorit.jpg';
import settings from '../Images/settings.png';
import addRecipe from '../Images/AddRecipe.png';
import { CheckBox, Icon } from 'react-native-elements';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
   title: ""    
  };
  constructor (props) {
    super(props)
    this.state = {
      checkedStarter: false,
      checkedMainCourse: true,
      checkedDessert: false,
      checkedMeat: false,
      checkedVegan: false,
      checkedVegetarian: false,
      checkedPescetar: false,
      checkedShellfish: false,
      checkedLaktose: false,
      checkedFish: false,
      checkedSoy: false,
      checkedWheat: false,
      checkedEgg: false,
      checkedNuts: false,
      checkedGluten: false,
      checkedVeggies: false,
      checkedPeanuts: false
      }
      
    }
    componentDidMount = () => {
      var that = this;
      firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/profile`).on('value', function (profile) {
        that.setState({
          checkedMeat: profile.val().Meateater,
          checkedVegan: profile.val().Vegan,
          checkedVegetarian: profile.val().Vegetarian,
          checkedPescetar: profile.val().Pescetar,
          checkedShellfish: profile.val().Shellfish,
          checkedLaktose: profile.val().Laktose,
          checkedFish: profile.val().Fish,
          checkedSoy: profile.val().Soy,
          checkedWheat: profile.val().Wheat,
          checkedEgg: profile.val().Egg,
          checkedNuts: profile.val().Nuts,
          checkedGluten: profile.val().Gluten,
          checkedVeggies: profile.val().Veggies,
          checkedPeanuts: profile.val().Peanuts 
        });
      })
    }
 
    //Setting the views to been shown or not depending on the profile.
  setVisibility = () => {
    var setMeat;
    var setVegan;
    var setVegetarian;
    var setPeacetar;
    var setShellfish;
    var setLaktose;
    var setFish;
    var setSoy;
    var setWheat;
    var setEgg;
    var setNuts;
    var setGluten;
    var setVeggies;
    var setPeanuts;

    if(this.state.checkedMeat) {
     this.setMeat= 'flex';
    }
    else {this.setMeat= 'none'};
    
    if(this.state.checkedVegan) {
    this.setVegan= 'flex';
    }
    else {this.setVegan= 'none'};
    
    if(this.state.checkedVegetarian) {
    this.setVegetarian= 'flex';
    }
     else {this.setVegetarian= 'none'};
     
    if(this.state.checkedPescetar) {
    this.setPeacetar= 'flex';
    }
    else {this.setPeacetar= 'none'};
     
    if(this.state.checkedShellfish) {
      this.setShellfish= 'flex';
      }
      else {this.setShellfish= 'none'};
       
    if(this.state.checkedLaktose) {
      this.setLaktose= 'flex';
      }
      else {this.setLaktose= 'none'};
       
    if(this.state.checkedFish) {
      this.setFish= 'flex';
      }
      else {this.setFish= 'none'};
       
    if(this.state.checkedSoy) {
      this.setSoy= 'flex';
      }
      else {this.setSoy= 'none'};
         
    if(this.state.checkedWheat) {
      this.setWheat= 'flex';
      }
      else {this.setWheat= 'none'};
         
    if(this.state.checkedEgg) {
      this.setEgg= 'flex';
      }
      else {this.setEgg= 'none'};
         
    if(this.state.checkedNuts) {
      this.setNuts= 'flex';
      }
      else {this.setNuts= 'none'};
         
    if(this.state.checkedGluten) {
      this.setGluten= 'flex';
      }
      else {this.setGluten= 'none'};
         
    if(this.state.checkedVeggies) {
      this.setVeggies= 'flex';
      }
      else {this.setVeggies= 'none'};
         
    if(this.state.checkedPeanuts) {
      this.setPeanuts= 'flex';
      }
      else {this.setPeanuts= 'none'};
  }

  updateProfile = () => {
    var ref = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/search`)
    var obj = { 
      Starter:this.state.checkedStarter, 
      MainCourse:this.state.checkedMainCourse, 
      Dessert:this.state.checkedDessert
    }
    ref.set(obj)
   
  }

    render() {
      this.setVisibility();
    return (
      <View style={styles.parentView}>
       <Text style={styles.headerText}>Hvilken opskrift søger du?</Text>
        <View style={styles.childView}>
         <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedStarter} title='Forret' onPress={() => this.setState({checkedStarter: !this.state.checkedStarter, checkedDessert: false, checkedMainCourse: false})}/>
         <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedMainCourse} title='Hovedret' onPress={() => this.setState({checkedMainCourse: !this.state.checkedMainCourse, checkedDessert: false, checkedStarter: false})}/>
         <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedDessert} title='Dessert' onPress={() => this.setState({checkedDessert: !this.state.checkedDessert, checkedMainCourse: false, checkedStarter: false})}/>
        </View>
      <Text style={styles.headerText}>Dine profilindstillinger</Text>
      <View>
        <Text>Der søges opskrifter som matcher disse kriterier:</Text>
        <View style={styles.childView}>
          <Text style={styles.headerText}>Kostvaner</Text>
          <Icon active name='edit' size={20} onPress={() => this.props.navigation.navigate('Profile')}/>
          <View >
          </View>        
          </View>
          <View style={{paddingLeft: 20}}>
          <Text  style={{display: this.setMeat}}>Kødæder</Text>
          <Text  style={{display: this.setVegetarian}}>Vegetar</Text>
          <Text  style={{display: this.setVegan}}>Vegeaner</Text>
          <Text  style={{display: this.setPeacetar}}>Pescetar</Text>
          </View>
        <View style={styles.childView}>
        <Text style={styles.headerText}>Allergier</Text>
        <Icon active name='edit' size={20} onPress={() => this.props.navigation.navigate('Profile')}/>
        </View>
      
      <View style={{paddingLeft: 20}}>
          <Text  style={{display: this.setShellfish}}>Skaldyr</Text>
          <Text  style={{display: this.setLaktose}}>Laktose</Text>
          <Text  style={{display: this.setFish}}>Fisk</Text>
          <Text  style={{display: this.setSoy}}>Soyabønner</Text>
          <Text  style={{display: this.setWheat}}>Hvede</Text>
          <Text  style={{display: this.setEgg}}>Æg</Text>
          <Text  style={{display: this.setNuts}}>Nødder</Text>
          <Text  style={{display: this.setGluten}}>Gluten</Text>
          <Text  style={{display: this.setVeggies}}>Grøntsager</Text>
          <Text  style={{display: this.setPeanuts}}>Jordnødder</Text>
          </View>
          </View>
      <Button title="Find opskrifter" onPress={() => this.updateProfile()}/>
     </View>
       
    )
  }
}


const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor:'white',
    alignContent: 'center',
    alignItems: 'center',

  },
  childView: {
    
    flexDirection: 'row',
    padding: 2
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20, 
    textAlign: 'left',
  }
})
