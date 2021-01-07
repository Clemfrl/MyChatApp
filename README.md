# Welcome to MyChatApp !

## About

Mobile application written in React Native, utilizing React Navigation and React Native Gifted Chat, amongst others.
This project was part of the CF Full-Stack Web Development course.
The user can log in and send the following types of messages:

- text,
- location,
- image from camera roll,
- new photo.

## Getting started

1. In order to run the app, install Expo by running `npm install expo-cli -g` in the project directory.
2. Download the Expo app on your smartphone. For more info, click [here](https://expo.io).
3. Running the app on a virtual device requires installing either Android Studio for an Android emulator or XCode for an iOs emulator.
4. The app stores data in Google Firebase. To create an account, click [here](https://firebase.google.com).
5. After registration, "Go to Console" and "Add Project". Follow the instructions without changing anything.
6. Click on "Create your project", then choose "Database" on the left side (NOT real-time database!).
7. Click on "Create Database", then "Start in test mode". You can use test mode for 30 days without writing security rules.
8. Click on "Start Collection" and name it "messages". If you decide on another name, make sure to replace all references to it in the code for the chat app.
   Choose "auto ID" and follow the instructions.
9. Click on "Authentication", then "Set up sign-in method" and choose anonymous authentication.
10. Click on "Storage" on the left and set up a cloud storage (for images and geolocation).
11. Click on the cogwheel pn top of the "Develop" tab and select "Project settings". Click on the "</>" button in order to add this Firebase storage to a web app.
12. Choose a name for your project, then copy the contents of the "firebaseConfig" section and paste it into the constructor of the Chat.js file.
    You can find the Firebase documentation [here](https://firebase.google.com/docs).
    Make sure to initialize the app with your own Cloud Firestore credentials. To do so, replace the following part in the code of Chat.js:
    ![code to be replaced](/assets/credentials.PNG)
    To start the app, run `npm start` or `expo start` in the project directory.

## Dependencies

Install all dependencies by running `npm install` in the project directory.

### Modules

- "@react-native-community/async-storage",
- "@react-native-community/masked-view",
- "@react-native-community/netinfo",
- "@react-navigation/native",
- "@react-navigation/stack",
- "expo",
- "expo-image-picker",
- "expo-location",
- "expo-permissions",
- "expo-status-bar",
- "firebase",
- "prop-types",
- "react",
  \*"react-dom",
- "react-dom",
- "react-native",
- "react-native-gesture-handler",
- "react-native-gifted-chat",
- "react-native-keyboard-spacer",
- "react-native-maps",
- "react-native-reanimated",
- "react-native-safe-area-context",
- "react-native-screens",
- "react-native-web",
- "react-navigation"

### Libraries

The app uses [GiftedChat](https://github.com/FaridSafi/react-native-gifted-chat).

### Planned updates:

#### SplashScreen:

- [ ] Place 'user' icon in TextInput
