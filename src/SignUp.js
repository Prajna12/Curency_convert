import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,KeyboardAvoidingView  } from 'react-native';

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: "Sign Up"
  }
  state = {
    loading: true,
    error: false,
    posts: [],
  }
  

  render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
         <TextInput
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(text) => this.setState({text})}
          uname={this.state.text}
        />
         <TextInput
         style={{height: 40}}
          placeholder="Email Id"
          onChangeText={(text) => this.setState({text})}
          mail={this.state.text}
        />
          <TextInput
         style={{height: 40}}
          placeholder="Set Password"
          onChangeText={(text) => this.setState({text})}
          pass={this.state.text}
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
  componentWillMount = async () => {
    let username = "uname"
    let password = "pass"
    let signupUrl = 'https://app.alkalize14.hasura-app.io/signup'
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json"
      }
    };
  
    let body = {
      "provider":"username",
      "data": {
        "username": username,
        "password": password
      }
    };
  
    requestOptions["body"] = JSON.stringify(body);
    console.log("Auth Response ---------------------");
    
    try {
      let resp = await fetch(signupUrl, requestOptions);
      console.log(resp);
      return resp; 
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
