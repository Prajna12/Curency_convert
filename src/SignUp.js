import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,KeyboardAvoidingView  } from 'react-native';

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: "Sign Up"
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
         <TextInput
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(text) => this.setState({text})}
        />
         <TextInput
         style={{height: 40}}
          placeholder="Email Id"
          onChangeText={(text) => this.setState({text})}
        />
          <TextInput
         style={{height: 40}}
          placeholder="Set Password"
          onChangeText={(text) => this.setState({text})}
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
