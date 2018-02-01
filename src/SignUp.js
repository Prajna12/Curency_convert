import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,KeyboardAvoidingView  } from 'react-native';

export default class SignUp extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
	  	isLoggedIn : false,
	  	uname : '',
      pass : '',
      loading: true,
      error: false,
      posts: [],
	  }
  }
  static navigationOptions = {
    title: "Sign Up"
  }
  handleUsernameChange = uname => {
  	this.setState({
  		...this.state,
  		uname: uname
  	})
  }

  handlePasswordChange = pass => {
  	this.setState({
  		...this.state,
  		pass: pass
  	})
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
         <TextInput
          style={{height: 40}}
          placeholder="Username"
          value={this.state.uname} 
          onChangeText={this.handleUsernameChange}
        />
         <TextInput
         style={{height: 40}}
          placeholder="Email Id"
          
        />
          <TextInput
         style={{height: 40}}
          placeholder="Set Password"
          value={this.state.pass} 
          onChangeText={this.handlePasswordChange}
        />
    <Button
  onPress={() => navigate("Login", {screen: "Login"})}
  title="Register"
  color="#841584"
  
/>
<View style={{ height: 60 }} />
</KeyboardAvoidingView>
    );
  }
  
 tryLogin = async (uname, pass) => {
    let signupUrl = 'https://app.alkalize14.hasura-app.io/signup'
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: 
        JSON.stringify({
          "username": uname,
          "password": pass 
        })
    };
  
    // let body = {
    //   "provider":"username",
    //   "data": {
    //     "username": username,
    //     "password": password
    //   }
    // };
  
    //requestOptions["body"] = JSON.stringify(body);
    console.log("Auth Response ---------------------");
    
    try {
      let resp = await fetch(signupUrl, requestOptions);
      console.log(resp);
      if(resp.status !== 200){
        if (resp.status === 504) {
          Alert.alert("Network Error", "Check your internet connection" )
        } else {
          Alert.alert("Error", "Password too short / User already exists")      
        }
      } else {
        this.setState({isLoggedIn:true})  
      }
    }
    catch(e) {
      console.log("Request Failed: " + e);
      return networkErrorObj;
    }
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
