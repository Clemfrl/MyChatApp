// Importing dependencies
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
// NetInfo checks user's network status
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";

//Importing Firebase
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends Component {
  constructor() {
    super();

    // referencing the firestore database
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCgmE_qXoYtZvqfXTN4Tktbl1m4mzip6mA",
        authDomain: "chatapp-a7858.firebaseapp.com",
        projectId: "chatapp-a7858",
        storageBucket: "chatapp-a7858.appspot.com",
        messagingSenderId: "18512970665",
        appId: "1:18512970665:web:637eb433c9d1e2d4a77ab8",
      });
    }

    // referencing the "messages" collection of the database
    this.referenceMessages = firebase.firestore().collection("messages");

    // initializing state for message and user + user ID
    this.state = {
      messages: [],
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      uid: 0,
    };
  }

  //this will put the users name in navigation bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

  // Retrieves messages from AsyncStorage
  getMessages = async () => {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Saves messages to AsyncStorage
  saveMessages = async () => {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Deletes messages from AsyncStorage
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem("messages");
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    // Defining variables from SplashScreen
    let { userName } = this.props.route.params;
    // Setting default username in case the user didn't enter one
    if (!userName) userName = "User";
    // Displaying username on the navbar in place of the title
    this.props.navigation.setOptions({ title: userName });

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            // console.log("user is :", user);
            if (!user) {
              try {
                await firebase.auth().signInAnonymously();
              } catch (error) {
                console.log(error.message);
              }
            }
            // console.log("props: ", this.props);
            this.setState({
              isConnected: true,
              user: {
                _id: user.uid,
                name: this.props.route.params.userName,
              },
              loggedInText:
                this.props.route.params.userName + " has entered the chat",
              messages: [],
            });
            this.unsubscribe = this.referenceMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
      }
    });
  }

  // Stop listening to authentication and collection changes
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  // Writes chat messages to state messages
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text.toString(),
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  // Adding the message object to the collection
  addMessages() {
    this.referenceMessages.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text,
      createdAt: this.state.messages[0].createdAt,
      user: this.state.messages[0].user,
      uid: this.state.uid,
    });
  }

  onSend(messages = []) {
    // "previousState" references the component's state at the time the change is applied
    this.setState(
      (previousState) => ({
        // Appends the new messages to the messages object/state
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
        this.saveMessages();
      }
    );
  }

  //Changing the color of the chat
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  }

  // Disables InputToolbar if user is offline
  renderInputToolbar = (props) => {
    if (this.state.isConnected === false) {
    } else {
      return <InputToolbar {...props} />;
    }
  };

  render() {
    // Defining variables from SplashScreen
    let { backgroundColor } = this.props.route.params;

    return (
      <View
        style={[styles.chatBackground, { backgroundColor: backgroundColor }]}
      >
        <GiftedChat
          renderInputToolbar={this.renderInputToolbar}
          renderBubble={this.renderBubble}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

// Creating styling
const styles = StyleSheet.create({
  chatBackground: {
    flex: 1,
  },
});
