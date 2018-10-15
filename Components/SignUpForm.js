import React, { Component } from 'react';
import { Text, TextInput,StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import firebase from 'firebase';

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
  }

  onSignUpFailed(err) {
    this.setState({ 
      loading: false, 
      error: err.message });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
          <Text>Opret profil</Text>

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
      </View>
    );
  }

  renderButton() {
    if(this.state.loading) {
      return <ActivityIndicator size='small' />
    }
    return (
      <Button title="Opret profil" onPress={this.onButtonPress.bind(this)}>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});
