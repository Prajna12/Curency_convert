
import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,KeyboardAvoidingView, Animated, Keyboard  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Header, Content, Form, Item, Input,Footer } from 'native-base';
export default class ChatBox extends React.Component {
  static navigationOptions = {
    title: "Chat"
  }
  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);
    
  }

  componentDidMount () {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  keyboardDidShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
      //  duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      
    ]).start();
  };

  keyboardDidHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
       // duration: event.duration,
        toValue: 0,
      }),
     
    ]).start();
  };
  render() {
    const { navigate } = this.props.navigation
    return (
      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
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
 
    </Animated.View>
      
      
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