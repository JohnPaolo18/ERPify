****Welcome to our project ERPify***
This is a music app that plays music from Spotify API

***Things needed to run the App***
1. Must have a premium Spotify account
2. Make an app on Spotify developer using your Spotify Account (it is important to save the redirect URI that matches the expo direct URI in the logs)
3. Go to src/helpers/spotifyAPI.js and paste your clientid and client secret in the refresh access token
4. Go to src/screens/LoginScreen.js and paste again the client id and your redirect URI (example : exp://11.11.2.300:8081)
5. According to Spotify's documentation, utilizing the Web Playback SDK requires the Spotify app to be active on the user's device. This is because the SDK functions as a Spotify Connect device, necessitating the Spotify app to manage playback and ensure compliance with licensing agreements. -- please refer to the link for more details-- https://developer.spotify.com/documentation/web-playback-sdk
   

**Before running the app make sure to run -- 
1. npm install
2, And then run -- npx expo start
**Sometimes expo has updates and will give a warning that you need to install the latest version, just install the latest and the app should run :)**

## However you can install all the npm manually if you wish
npm install @expo/metro-runtime@~4.0.0 \
@expo/vector-icons@^14.0.2 \
@gorhom/bottom-sheet@^5.0.6 \
@react-native-async-storage/async-storage@1.23.1 \
@react-navigation/bottom-tabs@^6.6.1 \
@react-navigation/native@^6.1.18 \
@react-navigation/native-stack@^6.11.0 \
axios@^1.7.9 \
expo@^52.0.18 \
expo-auth-session@~6.0.1 \
expo-av@~15.0.1 \
expo-linear-gradient@~14.0.1 \
expo-status-bar@~2.0.0 \
lodash@^4.17.21 \
react@18.3.1 \
react-dom@18.3.1 \
react-native@0.76.5 \
react-native-modal@^13.0.1 \
react-native-safe-area-context@4.12.0 \
react-native-screens@~4.1.0 \
react-native-web@~0.19.13


