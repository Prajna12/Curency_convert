import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,KeyboardAvoidingView } from 'react-native';
import { Container, Header, Content, Form, Item, Input,Footer } from 'native-base';
export default class ChatBox extends React.Component {
  static navigationOptions = {
    title: "Chat Screen"
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
      <View style={{flexDirection:"row"}}>
      <TextInput
         style={{height: 40,flex:2}}
          placeholder="Type Here"
          onChangeText={(text) => this.setState({text})}
        />
    <Button
  onPress={() => navigate("ChatBox", {screen: "ChatBox"})}
  title="Send"
  color="#841584"
  style={{flex:1}}
  disabled
/>
</View>

      </KeyboardAvoidingView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
   // alignItems: 'center',
    justifyContent: 'flex-end',
    padding:10,
  },
});
