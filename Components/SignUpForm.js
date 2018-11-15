import React, { Component } from 'react';
import { Text, TextInput,StyleSheet, View, ActivityIndicator, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import fridge from './Images/fridge.jpg';

export default class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '', 
      loading: false   
    }
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ 
      error: '', 
      loading: true 
    });

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onSignUpSuccess.bind(this))
        .catch(this.onSignUpFailed.bind(this));
  }

  onSignUpSuccess() {
    this.setState({ 
      email: '', 
      password: '', 
      loading: false, 
      error: '' });
    alert("Brugeren er oprettet");
    this.setProfile();
  }

  onSignUpFailed(err) {
    this.setState({ 
      loading: false, 
      error: err.message });
  }
  setProfile = () => {
    var ref = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/profile`)
    var obj = { 
      Meateater: false,
      Vegan: false,
      Vegetarian: false,
      Pescetar: false,
      Shellfish: false,
      Laktose: false,
      Fish: false,
      Soy: false,
      Wheat: false, 
      Egg: false,
      Nuts: false,
      Gluten: false,
      Veggies: false,
      Peanuts: false    
    }
    ref.set(obj)   
  }

  render() {
    return (
   
      <View style={{ alignItems: 'center', justifyContent: 'center',}}>
          <Text style={styles.headerText}>Opret profil</Text>

          <TextInput style={styles.input}
          label='Username'
            placeholder='bruger@mail.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput style={styles.input}
            placeholder='kodeord'
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

          {this.renderButton()}
      </View>
   
    );
  }

  renderButton() {
    if(this.state.loading) {
      return <ActivityIndicator size='small' />
    }
    return (
      
      <Button 
      title="Opret profil" 
      onPress={this.onButtonPress.bind(this)}
      buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 120,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10,
            marginTop: 2
          }}>
      </Button>
      
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  backgroundImage: {
    width: '100%', 
    height: '100%'
  },
  input: {
    height: 36,
    width: 180,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'green',
    backgroundColor: 'white',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20, 
    textAlign: 'center',
    backgroundColor: 'white',
    width: 125,
    height: 35
  }
});
