// Importing dependencies
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  //this will put the users name in navigation bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

  //Testing app with static messages
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },

        {
          _id: 3,
          text: "Hello, chat!",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.props.route.params.userName,
          },
        },
        {
          _id: 2,
          text: this.props.route.params.userName + " has joined the chat",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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

  render() {
    // Defining variables from SplashScreen
    let { userName, backgroundColor } = this.props.route.params;
    // Setting default username in case the user didn't enter one
    if (!userName || userName === "") userName = "User";
    // Displaying username on the navbar in place of the title
    this.props.navigation.setOptions({ title: userName });

    return (
      <View
        style={[styles.chatBackground, { backgroundColor: backgroundColor }]}
      >
        <GiftedChat
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

// // // Defining variables from SplashScreen
// let { userName, backgroundColor } = this.props.route.params;

// // Setting default username in case the user didn't enter one
// if (!userName || userName === "") userName = "User";

// // Displaying username on the navbar in place of the title
// this.props.navigation.setOptions({ title: userName });

// return (
//   // Setting background to the color chosen by the user on SplashScreen
//   <View
//     style={[styles.chatBackground, { backgroundColor: backgroundColor }]}
//   >
//     {/* Displaying placeholder text until chat is properly implemented */}
//     <Text style={{ color: "#FFFFFF" }}>This chat is currently empty.</Text>
//   </View>
// );
