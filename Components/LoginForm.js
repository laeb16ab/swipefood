import React, { Component } from 'react';
import { Text, StyleSheet, ActivityIndicator, TextInput, Image, View, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import SignUpForm from './SignUpForm';
import fridge from './Images/fridge.jpg';

export default class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      hasLogin: true
    };
  }

  //Sends email and password to Firebase for verification.
  signIn() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  //If login succes, email and password are set to empty. 
  onLoginSuccess() {
    this.setState({ email: '', password: '', loading: false, error: '' });
  }

  //If login error, it returns error message.
  onLoginFail(err) {
    this.setState({ loading: false, error: err.message });
  }


  render() {
    switch(this.state.hasLogin) {
      
      case true: 
      return (
      <ImageBackground source={fridge} style={styles.backgroundImage}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
           <Text style={styles.headerText}>Log ind</Text>
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
          <Button title='Opret profil' onPress={() => this.setState({hasLogin : false})}/>
        </View>
      </ImageBackground>
      );
      case false: {
        return(
        
          <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
            <SignUpForm/>
            <Button title='Gå tilbage' onPress={() => this.setState({hasLogin : true})}/>
          </View>
       
        )
      }  
    }
  }
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='small' />
    }
    return (
      <Button title="Log ind" onPress={this.signIn.bind(this)}>
      </Button>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageView: {
    flex:1,
   height: '100%',
   width: '100%', 
   resizeMode: 'contain',
  },
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
  padding: 10,
  marginTop: 20,
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
