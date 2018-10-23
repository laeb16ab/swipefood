import React, { Component } from 'react';
import { Text, StyleSheet, ActivityIndicator, TextInput, Image, View, Button } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './SignUpForm';


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

  signIn() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginSuccess() {
    this.setState({ email: '', password: '', loading: false, error: '' });
  }

  onLoginFail(err) {
    this.setState({ loading: false, error: err.message });
  }


  render() {
    switch(this.state.hasLogin) {
      
      case true: 
      return (
        
        <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
           <Text>Log ind</Text>
          <TextInput
            label='Username'
            placeholder='bruger@mail.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
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
  }
});
