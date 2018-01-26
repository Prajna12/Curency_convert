import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,KeyboardAvoidingView  } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login Screen"
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
          placeholder="Password"
          onChangeText={(text) => this.setState({text})}
        />
        <View  style={{paddingBottom:10}}>
        <Button
  onPress={() => navigate("ChatBox", {screen: "ChatBox"})}
  title="Login"
  color="#841584"
 
  
/>
</View>
<Button
  onPress={() => navigate("SignUp", {screen: "SignUp"})}
  title="Sign Up"
  color="#841554"
 
  
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
   // alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },
});
