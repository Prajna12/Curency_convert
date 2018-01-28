import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,KeyboardAvoidingView} from 'react-native';
import { Container, Header, Content, Form, Item, Input,Footer } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
export default class ChatBox extends React.Component {
  static navigationOptions = {
    title: "Chat"
  }
  render() {
    const { navigate } = this.props.navigation
    return (
     // <KeyboardAvoidingView style={styles.container} behavior="padding">
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
     
           <TextInput
         style={{height: 40,flex:2}}
          placeholder="Type Here"
          onChangeText={(text) => this.setState({text})}
        />
    <Button
  onPress={() => navigate("ChatBox", {screen: "ChatBox"})}
  title="Send"
  color="#841584"
  // style={{flex:1}}
  disabled
/>
</KeyboardAwareScrollView>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     flexDirection: "row",
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//     padding:10,
//   },
// });
