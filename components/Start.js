// Importing dependencies
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

// Importing the background image from the assets folder
const backgroundImage = require("../assets/Background_Image.png");
// Icon to be used in the input field - currently unused!
const inputIcon = require("../assets/icon1.png");

// Array of background colors with HEX codes to choose from
const backgroundColorOptions = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);

    // Initializing the state of the app
    this.state = {
      userName: "",
      // Setting a default background color in case the user doesn't select one - can overwrite it by tapping on a color
      backgroundColor: backgroundColorOptions[2],
    };
  }

  render() {
    return (
      // Setting background image to cover the whole screen
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        {/* App title */}
        <Text style={styles.title}>My ChatApp!</Text>

        {/* Login box */}
        <View style={styles.loginBox}>
          {/* Input field for username */}

          <View style={styles.textBox}>
            <Image
              source={require("../assets/icon1.png")}
              style={styles.iconStyle}
            />

            <TextInput
              style={styles.input}
              // Updating username based on user's input
              onChangeText={(userName) => this.setState({ userName })}
              // Displaying user's input as it's being typed
              value={this.state.text}
              // Displaying to user what to input
              placeholder="Your Name"
            />
          </View>
          {/* Choose background color */}
          <View style={styles.chooseColorBox}>
            <Text style={styles.chooseColor}>Choose Background Color:</Text>
          </View>

          {/* Displaying background color options (circles) */}
          <View style={styles.backgroundColorOptions}>
            <TouchableOpacity
              // Changing the background color to this if user taps on it - position: 0 from the array defined above
              onPress={() =>
                this.setState({ backgroundColor: backgroundColorOptions[0] })
              }
              // Displaying the color (circle) itself
              style={[
                styles.colorSelector,
                { backgroundColor: backgroundColorOptions[0] },
              ]}
            />

            <TouchableOpacity
              // Changing the background color to this if user taps on it - position: 1 from the array defined above
              onPress={() =>
                this.setState({ backgroundColor: backgroundColorOptions[1] })
              }
              // Displaying the color (circle) itself
              style={[
                styles.colorSelector,
                { backgroundColor: backgroundColorOptions[1] },
              ]}
            />

            <TouchableOpacity
              // Changing the background color to this if user taps on it - position: 2 from the array defined above
              onPress={() =>
                this.setState({ backgroundColor: backgroundColorOptions[2] })
              }
              // Displaying the color (circle) itself
              style={[
                styles.colorSelector,
                { backgroundColor: backgroundColorOptions[2] },
              ]}
            />

            <TouchableOpacity
              // Changing the background color to this if user taps on it - position: 3 from the array defined above
              onPress={() =>
                this.setState({ backgroundColor: backgroundColorOptions[3] })
              }
              // Displaying the color (circle) itself
              style={[
                styles.colorSelector,
                { backgroundColor: backgroundColorOptions[3] },
              ]}
            />
          </View>

          {/* Start Chatting button*/}
          <View style={styles.startButton}>
            <TouchableOpacity
              // Navigates to Chat view when the user taps on it
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  // Updates the username as per user's input
                  userName: this.state.userName,
                  // Updates the background color as per user's choice (circle)
                  backgroundColor: this.state.backgroundColor,
                })
              }
              title="Start chatting"
            >
              {/* Text on the button */}
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

// Creating styling
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 60,
    fontWeight: "700",
    color: "#FFFFFF",
    alignSelf: "center",
    marginTop: 100,
  },
  loginBox: {
    flex: 1,
    backgroundColor: "white",
    height: "44%",
    width: "88%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "20%",
  },
  iconStyle: {
    padding: 10,
    marginLeft: 10,
    marginRight: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#757083",
    height: 60,
    width: "88%",
    marginTop: 18,
    marginBottom: 30,
  },
  input: {
    alignItems: "center",
    width: "88%",
    fontSize: 16,
  },
  chooseColorBox: {
    alignSelf: "flex-start",
    flex: 1,
    width: "88%",
    paddingLeft: 24,
    paddingBottom: "1%",
    marginTop: 20,
  },
  chooseColor: {
    fontSize: 18,
    fontWeight: "400",
    color: "#757083",
    opacity: 100,
  },
  backgroundColorOptions: {
    flex: 4,
    flexDirection: "row",
    alignSelf: "flex-start",
    width: "80%",
    justifyContent: "space-around",
    paddingLeft: 16,
    paddingTop: 10,
  },
  colorSelector: {
    position: "relative",
    height: 40,
    width: 40,
    borderRadius: 50,
    margin: 2,
    borderColor: "white",
  },
  startButton: {
    backgroundColor: "#757083",
    textAlign: "center",
    alignItems: "center",
    width: "88%",
    height: "18%",
    marginBottom: "5%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    justifyContent: "center",
    alignSelf: "stretch",
    textAlignVertical: "center",
    marginTop: 20,
  },
});
