
import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View} from 'react-native';
import LoginForm from './Components/LoginForm';
import Home from './Components/Pages/Home';
import firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    }
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyB82wJBR4f42xYjOzDWaadzuWTZFI4l10o",
    authDomain: "fir-projekt-d6792.firebaseapp.com",
    databaseURL: "https://fir-projekt-d6792.firebaseio.com",
    projectId: "fir-projekt-d6792",
    storageBucket: "fir-projekt-d6792.appspot.com",
    messagingSenderId: "591524020204"
    })

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    this.setState({ loggedIn: true });
  } else {
    this.setState({ loggedIn: false });
  }
});
}

render() {
switch (this.state.loggedIn) {
  case true:
    return (
      <View style={styles.container}>
        <Home/>
      </View>
    );
  case false:
    return (
      <View style={styles.container}>
      <LoginForm />
      </View>
    );
  default:
    return <ActivityIndicator size="large" />
}
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'stretch',
justifyContent: 'center',
},
});
