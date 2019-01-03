import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'firebase';
import { CheckBox, Button, } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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

  //Updates the variables based on the userinformation from Firebase.
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

  //Checkes if at least one of the "Kostvaner" is checked before updating profile in Firebase.
  updateProfile = () => {
    if(this.state.checkedMeat || this.state.checkedVegetarian || this.state.checkedPescetar || this.state.checkedVegan ) {
    alert('Din brugerprofil er nu opdateret')
    var ref = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/profile`)
    var obj = { 
      Meateater:this.state.checkedMeat, 
      Vegan:this.state.checkedVegan, 
      Vegetarian:this.state.checkedVegetarian, 
      Pescetar:this.state.checkedPescetar, 
      Shellfish:this.state.checkedShellfish,
      Laktose:this.state.checkedLaktose,
      Fish:this.state.checkedFish,
      Soy:this.state.checkedSoy,
      Wheat:this.state.checkedWheat,
      Egg:this.state.checkedEgg,
      Nuts:this.state.checkedNuts,
      Gluten:this.state.checkedGluten,
      Veggies:this.state.checkedVeggies,
      Peanuts:this.state.checkedPeanuts    
    }
    ref.update(obj)   
  }
  else {
    alert('Du skal vælge mindst én kostvane')
    }
  }

  //Loads the profile page and fills out the boxes based on the variables.
    render() {
         return (
      <ScrollView>
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.headerText}>Profil</Text>
       <Text></Text>
          <Text style={styles.headerText}>Kostvaner</Text>
  
       <View style={styles.childView}> 
         
          <View>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedMeat} title='Kødæder' onPress={() => this.setState({checkedMeat: !this.state.checkedMeat})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedVegan} title='Vegeaner'onPress={() => this.setState({checkedVegan: !this.state.checkedVegan})}/>
            </View>
          <View>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedVegetarian} title='Vegetar' onPress={() => this.setState({checkedVegetarian: !this.state.checkedVegetarian})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedPescetar} title='Pescetar' onPress={() => this.setState({checkedPescetar: !this.state.checkedPescetar})}/>
          </View>
        </View>
        
        <Text style={styles.headerText}>Allergi</Text>
          <View style={styles.childView}>
          <View>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedShellfish} title='Skaldyr' onPress={() => this.setState({checkedShellfish: !this.state.checkedShellfish, checkedEgg: false, checkedFish: false, checkedGluten: false, checkedLaktose: false, checkedNuts: false, checkedPeanuts: false, checkedSoy: false, checkedVeggies: false, checkedWheat: false})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedLaktose} title='Laktose' onPress={() => this.setState({checkedLaktose: !this.state.checkedLaktose, checkedEgg: false, checkedShellfish: false, checkedFish: false, checkedGluten: false, checkedNuts: false, checkedPeanuts: false, checkedSoy: false, checkedVeggies: false, checkedWheat: false})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedFish} title='Fisk' onPress={() => this.setState({checkedFish: !this.state.checkedFish, checkedEgg: false, checkedShellfish: false, checkedGluten: false, checkedLaktose: false, checkedNuts: false, checkedPeanuts: false, checkedSoy: false, checkedVeggies: false, checkedWheat: false})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedSoy} title='Sojabønner' onPress={() => this.setState({checkedSoy: !this.state.checkedSoy, checkedEgg: false, checkedShellfish: false, checkedFish: false, checkedGluten: false, checkedLaktose: false, checkedNuts: false, checkedPeanuts: false, checkedVeggies: false, checkedWheat: false})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedWheat} title='Hvede' onPress={() => this.setState({checkedWheat: !this.state.checkedWheat, checkedEgg: false, checkedShellfish: false, checkedFish: false, checkedGluten: false, checkedLaktose: false, checkedNuts: false, checkedPeanuts: false, checkedSoy: false, checkedVeggies: false})}/>
          </View>

          <View>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedEgg} title='Æg' onPress={() => this.setState({checkedEgg: !this.state.checkedEgg, checkedShellfish: false, checkedFish: false, checkedGluten: false, checkedLaktose: false, checkedNuts: false, checkedPeanuts: false, checkedSoy: false, checkedVeggies: false, checkedWheat: false})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedNuts} title='Nødder' onPress={() => this.setState({checkedNuts: !this.state.checkedNuts, checkedEgg: false, checkedShellfish: false, checkedFish: false, checkedGluten: false, checkedLaktose: false, checkedPeanuts: false, checkedSoy: false, checkedVeggies: false, checkedWheat: false})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedGluten} title='Gluten' onPress={() => this.setState({checkedGluten: !this.state.checkedGluten, checkedEgg: false, checkedShellfish: false, checkedFish: false, checkedLaktose: false, checkedNuts: false, checkedPeanuts: false, checkedSoy: false, checkedVeggies: false, checkedWheat: false})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedVeggies} title='Grøntsager' onPress={() => this.setState({checkedVeggies: !this.state.checkedVeggies, checkedEgg: false, checkedShellfish: false, checkedFish: false, checkedGluten: false, checkedLaktose: false, checkedNuts: false, checkedPeanuts: false, checkedSoy: false, checkedWheat: false})}/>
            <CheckBox checked containerStyle={{backgroundColor: 'white', borderColor: 'white'}} checked={this.state.checkedPeanuts} title='Jordnødder' onPress={() => this.setState({checkedPeanuts: !this.state.checkedPeanuts, checkedEgg: false, checkedShellfish: false, checkedFish: false, checkedGluten: false, checkedLaktose: false, checkedNuts: false, checkedSoy: false, checkedVeggies: false, checkedWheat: false})}/>
          </View>
          </View>
          
      
        <Button 
        title="Opdater profil" 
        onPress={this.updateProfile}
        buttonStyle={{
          backgroundColor: "rgba(92, 99,216, 1)",
          width: 125,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 10,
          marginTop: 2
        }}>
        </Button> 
        <Button 
        title="Log ud" 
        onPress={() => firebase.auth().signOut().then(() => alert("Du er nu logget ud"))}
        buttonStyle={{
          backgroundColor: "rgba(92, 99,216, 1)",
          width: 125,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 10,
          marginTop: 2
        }}>
        </Button>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor:'white', 
  },
  childView: {
    
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20, 
    textAlign: 'left',
  }
})