
import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,KeyboardAvoidingView, Animated, Keyboard, FlatList  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Header, Content, Form, Item, Input,Footer } from 'native-base';
export default class ChatBox extends React.Component {
  static navigationOptions = {
    title: "Chat"
  }
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
    this.state = {
      query : ' ',
      messages: [],
      resp: ' '
    }
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
  handleQuery = async() => {
    
    var url = "https://api.dialogflow.com/v1/query?v=20150910";

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer e5b2af61428143da80e7a57380c63af4"
        }
    };
    
    var body = {
            "lang": "en",
            "query" : this.state.query,
            "sessionId":"ed49f385-decb-4859-bebd-1dd6b842ac1c",
            "timezone":"America/Los_Angeles"
    };
    
    requestOptions.body = JSON.stringify(body);
    
    fetch(url, requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({resp:responseJson.result.fulfillment.displayText});
      console.log(responseJson.result.fulfillment.displayText)
      })
    .catch((error) => {
      console.log(error);
    });
  }
  insertMessage = () => {
    let msg = [{query:this.state.query, resp:this.state.resp}, ...this.state.messages]
    this.setState({messages: msg})
    this.state.messages.map((item, key)=>(
      <Text key={key}> { item } </Text>)
      )
  }

  render() {
    const { navigate } = this.props.navigation;
    const { messages } = this.state;
    return (
      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
       <View style={{flexDirection:"row"}}>
       <TextInput
          style={{height: 40,flex:2}}
           placeholder="Type Here"
           onChangeText={(text) => this.setState({query:text})}
         />
     <Button
   onPress={() =>{ this.handleQuery()
                    this.insertMessage()
                    }
                  //  navigate("ChatBox", {screen: "ChatBox"})
                }
   title="Send"
   color="#841584"
   style={{flex:1}}
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