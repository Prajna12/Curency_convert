import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,KeyboardAvoidingView,Alert } from 'react-native';
import {trySignup} from './ApiCall'
export default class SignUp extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
	  	isLoggedIn : false,
	  	username : ' ',
      password : ' ',
      email : ' ',
      authToken:' ',
      // loading: true,
      // error: false,
      // posts: [],
	  }
  }
  static navigationOptions = {
    title: "Sign Up"
  }
 

  handleSignupPressed = async() => {
    
      var url = "https://auth.animosity52.hasura-app.io/v1/signup";
  
      var requestOptions = {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          }
      };
      
      var body = {
          "provider": "username",
          "data": {
              "username": this.state.username,
              "password": this.state.password,
              //"email": "mail"
          }
      };
      
      requestOptions.body = JSON.stringify(body);
      
      fetch(url, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson.authToken !== null)
          Alert.alert("Successfully registered!")
        else
          Alert.alert(responseJson.code);
      })
      .catch((error) => {
        console.log(error);
      });
    }


  render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
         <TextInput
          style={{height: 40}}
          placeholder="Username"
         // value={this.state.uname} 
         returnKeyLabel = {"next"} 
         onChangeText={(text) => this.setState({username:text})}
        />
         <TextInput
         style={{height: 40}}
          placeholder="Email Id"
          value={this.state.mail} 
          onChangeText={(text) => this.setState({email:text})}
        />
          <TextInput
         style={{height: 40}}
          placeholder="Set Password"
          value={this.state.pass} 
          onChangeText={(text) => this.setState({password:text})}
        />
    <Button
  onPress={() => { this.handleSignupPressed()
                 navigate("Login", {screen: "Login"})
              }}
  title="Register"
  color="#841584"
  
/>
<View style={{ height: 60 }} />
</KeyboardAvoidingView>
    );
  }
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },
});
