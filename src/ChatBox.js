
import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,KeyboardAvoidingView, Animated, Keyboard, FlatList, Alert  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Header, Content, Form, Item, Input,Footer } from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';
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
      resp: 'Welcome',
      onTyping:''
    };
  }

  componentDidMount () {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide); 
    this.setState({
      messages : [
        {
          _id: 1,
          text: this.state.resp,
          createdAt: new Date(),
          user: {
            _id: 2,
            name:this.props.navigation.state.username,
          },
         
        }
      ]
    })
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
    console.log(this.state.query)
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
      this.setState({resp:responseJson.result.fulfillment.speech});
      console.log(responseJson.result.fulfillment.speech)
      Alert.alert(this.state.resp);
     // this.state.messages.push(this.state.query);
     // this.state.messages.push(this.state.resp);
      })
    .catch((error) => {
      console.log(error);
    });
  }
 
  async onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    let msg = messages[0].text
    console.log(msg)
    this.setState({query:await msg});
    console.log(this.state.query);
    this.handleQuery()
    }

  
  render() {
    const { navigate } = this.props.navigation;
    const { messages } = this.state;
    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;
   // console.log("Username : "+username);
    return (
     
//       <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
//        {/* <View>
//        <FlatList
//   data={messages}
  
//  // renderItem={({item}) => <Text>{item}</Text>}
//   renderItem ={ ({item, index}) => {
//   if (index%2 === 0) return <Text style={styles.query}>{username} : {item}</Text>
//   else  return <Text style={styles.reply}>ChatBot: {item}</Text>
 
// }}
//   keyExtractor={(item, index) => index}
//   extraData={this.state}
  
// />
      
       
// </View> */}
//        <View style={{flexDirection:"row"}}>
//        {/* <TextInput
//           style={{height: 40,flex:2}}
//            placeholder="Type Here"
//            onChangeText={(text) => this.setState({query:text})}
//          />
//      <Button
//    onPress={() =>{ this.handleQuery()
                    
//                     }
//                   //  navigate("ChatBox", {screen: "ChatBox"})
//                 }
//    title="Send"
//    color="#841584"
//    style={{flex:1}}
//  />
//               */}
             
//  </View>

//     </Animated.View>
      
<GiftedChat
messages={this.state.messages}
onSend={messages => this.onSend(messages)}
//onPressActionButton={this.handleQuery()}
placeholder = "Type your message here..."
forceGetKeyboardHeight={true}
/> 
 
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
  query: {

    color : 'red'
  },
  reply: {
    color: 'blue'
  },
});