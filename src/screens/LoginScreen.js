// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Pressable,
//   Image,
// } from "react-native";
// import React, { useEffect } from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import ERPifyLogo from "../assets/icons/ERPify.png";
// import * as AppAuth from "expo-app-auth";
// import * as AuthSession from "expo-auth-session";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// const redirectUri = AuthSession.makeRedirectUri();
// console.log("Redirect URI:", redirectUri);

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   useEffect(() => {
//     const checkTokenValidity = async () => {
//       const accessToken = await AsyncStorage.getItem("token");
//       const expirationDate = await AsyncStorage.getItem("expirationDate");
//       console.log("accessToken", accessToken);
//       console.log("expirationDate", expirationDate);

//       if (accessToken && expirationDate) {
//         const currentTime = Date.now();
//         if (currentTime < parseInt(expirationDate)) {
//           navigation.replace("Main");
//         } else {
//           AsyncStorage.removeItem("token");
//           AsyncStorage.removeItem("expirationDate");
//         }
//       }
//     };
//     checkTokenValidity();
//   }, []);
//   async function authenticate() {
//     const config = {
//       issuer: "https://accounts.spotify.com",
//       clientId: "4e94ff6dea6f484bb7e898eb00cef58b",
//       scopes: [
//         "user-read-email",
//         "playlist-read-private",
//         "playlist-read-collaborative",
//         "playlist-modify-public",
//         "user-library-read",
//         "user-read-recently-played",
//         "user-top-read",
//       ],
//       getRedirectUrl: "https://auth.expo.io/@anonymous/erpify",
//     };
//     const result = await AppAuth.authAsync(config);
//     // const result = await AuthSession.authAsync(config);
//     console.log(result);
//     if (result.accessToken) {
//       const expirationDate = new Date(
//         result.accessTokenExpirationDate
//       ).getTime();
//       AsyncStorage.setItem("token", result.accessToken);
//       AsyncStorage.setItem("expirationDate", expirationDate.toString());
//       navigation.navigate("Main");
//     }
//   }
//   return (
//     <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.logoContainer}>
//           <Image source={ERPifyLogo} style={styles.logo} resizeMode="contain" />
//         </View>

//         <Text style={styles.title}>Let's get you in</Text>

//         {/* Sign in with Google */}
//         <Pressable style={styles.signInButton}>
//           <FontAwesome name="google" size={24} color="red" />
//           <Text style={styles.signInButtonText}>Continue with Google</Text>
//         </Pressable>

//         {/* Sign in with Facebook */}
//         <Pressable style={styles.signInButton}>
//           <FontAwesome5 name="facebook" size={24} color="blue" />
//           <Text style={styles.signInButtonText}>Continue with Facebook</Text>
//         </Pressable>

//         <View style={styles.separatorContainer}>
//           <View style={styles.separatorLine} />
//           <Text style={styles.orText}>or</Text>
//           <View style={styles.separatorLine} />
//         </View>

//         {/* Log in with spotify */}
//         <Pressable onPress={authenticate} style={styles.passwordButton}>
//           <Text style={styles.passwordButtonText}>Log in with Spotify</Text>
//         </Pressable>

//         <Text style={styles.footerText}>
//           Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text>
//         </Text>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   logoContainer: {
//     marginBottom: 40,
//   },
//   logo: {
//     width: 350,
//     height: 350,
//   },
//   title: {
//     color: "white",
//     fontSize: 50,
//     fontWeight: "bold",
//     marginBottom: 40,
//   },
//   signInButton: {
//     backgroundColor: "#131624",
//     padding: 15,
//     width: "100%",
//     borderRadius: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//     borderColor: "#C0C0C0",
//     borderWidth: 0.8,
//   },
//   signInButtonText: {
//     color: "white",
//     fontWeight: "500",
//     textAlign: "center",
//     flex: 1,
//   },
//   separatorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   separatorLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#C0C0C0",
//   },
//   orText: {
//     color: "#C0C0C0",
//     marginHorizontal: 10,
//   },
//   passwordButton: {
//     backgroundColor: "#20BCF5",
//     padding: 15,
//     width: "100%",
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   passwordButtonText: {
//     color: "white",
//     fontWeight: "600",
//   },
//   footerText: {
//     color: "white",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   signUpText: {
//     color: "#20BCF5",
//     fontWeight: "600",
//   },
// });

// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Pressable,
//   Image,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import ERPifyLogo from "../assets/icons/ERPify.png";
// import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { useEffect } from "react";

// const LoginScreen = () => {
//   const navigation = useNavigation();

//   // Generate the redirect URI only once
//   const redirectUri = makeRedirectUri({
//     useProxy: true,
//   });
//   console.log("Generated Redirect URI:", redirectUri);

//   console.log("Redirect URI:", redirectUri); // Log the URI to ensure it's correct

//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId: "4e94ff6dea6f484bb7e898eb00cef58b",
//       scopes: [
//         "user-read-email",
//         "playlist-read-private",
//         "playlist-read-collaborative",
//         "playlist-modify-public",
//         "user-library-read",
//         "user-read-recently-played",
//         "user-top-read",
//       ],
//       redirectUri: redirectUri, // Use the declared redirect URI
//       responseType: "token",
//     },
//     { authorizationEndpoint: "https://accounts.spotify.com/authorize" }
//   );

//   // Handle the response from Spotify
//   useEffect(() => {
//     if (response?.type === "success" && response.params.access_token) {
//       const expirationDate = Date.now() + response.params.expires_in * 1000;
//       AsyncStorage.setItem("token", response.params.access_token);
//       AsyncStorage.setItem("expirationDate", expirationDate.toString());
//       navigation.navigate("Main");
//     }
//   }, [response]);

//   return (
//     <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.logoContainer}>
//           <Image source={ERPifyLogo} style={styles.logo} resizeMode="contain" />
//         </View>

//         <Text style={styles.title}>Let's get you in</Text>

//         <Pressable style={styles.signInButton}>
//           <FontAwesome name="google" size={24} color="red" />
//           <Text style={styles.signInButtonText}>Continue with Google</Text>
//         </Pressable>

//         <Pressable style={styles.signInButton}>
//           <FontAwesome5 name="facebook" size={24} color="blue" />
//           <Text style={styles.signInButtonText}>Continue with Facebook</Text>
//         </Pressable>

//         <View style={styles.separatorContainer}>
//           <View style={styles.separatorLine} />
//           <Text style={styles.orText}>or</Text>
//           <View style={styles.separatorLine} />
//         </View>

//         {/* Log in with Spotify */}
//         <Pressable onPress={() => promptAsync()} style={styles.passwordButton}>
//           <Text style={styles.passwordButtonText}>Log in with Spotify</Text>
//         </Pressable>

//         <Text style={styles.footerText}>
//           Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text>
//         </Text>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   logoContainer: {
//     marginBottom: 40,
//   },
//   logo: {
//     width: 350,
//     height: 350,
//   },
//   title: {
//     color: "white",
//     fontSize: 50,
//     fontWeight: "bold",
//     marginBottom: 40,
//   },
//   signInButton: {
//     backgroundColor: "#131624",
//     padding: 15,
//     width: "100%",
//     borderRadius: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//     borderColor: "#C0C0C0",
//     borderWidth: 0.8,
//   },
//   signInButtonText: {
//     color: "white",
//     fontWeight: "500",
//     textAlign: "center",
//     flex: 1,
//   },
//   separatorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   separatorLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#C0C0C0",
//   },
//   orText: {
//     color: "#C0C0C0",
//     marginHorizontal: 10,
//   },
//   passwordButton: {
//     backgroundColor: "#20BCF5",
//     padding: 15,
//     width: "100%",
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   passwordButtonText: {
//     color: "white",
//     fontWeight: "600",
//   },
//   footerText: {
//     color: "white",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   signUpText: {
//     color: "#20BCF5",
//     fontWeight: "600",
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ERPifyLogo from "../assets/icons/ERPify.png";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const LoginScreen = () => {
  const navigation = useNavigation();

  // Generate the redirect URI with the custom scheme
  const redirectUri = makeRedirectUri({
    native: "erpify://", // Use the custom scheme defined in app.json
  });
  console.log("Generated Redirect URI:", redirectUri);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "4e94ff6dea6f484bb7e898eb00cef58b",
      scopes: [
        "user-read-email",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
      ],
      redirectUri, // Use the custom redirect URI
      responseType: "token",
    },
    { authorizationEndpoint: "https://accounts.spotify.com/authorize" }
  );

  // Handle the response from Spotify
  useEffect(() => {
    if (response?.type === "success" && response.params.access_token) {
      const expirationDate = Date.now() + response.params.expires_in * 1000;
      AsyncStorage.setItem("token", response.params.access_token);
      AsyncStorage.setItem("expirationDate", expirationDate.toString());
      navigation.navigate("Main");
    }
  }, [response]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={ERPifyLogo} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.title}>Let's get you in</Text>

        <Pressable style={styles.signInButton}>
          <FontAwesome name="google" size={24} color="red" />
          <Text style={styles.signInButtonText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.signInButton}>
          <FontAwesome5 name="facebook" size={24} color="blue" />
          <Text style={styles.signInButtonText}>Continue with Facebook</Text>
        </Pressable>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Log in with Spotify */}
        <Pressable onPress={() => promptAsync()} style={styles.passwordButton}>
          <Text style={styles.passwordButtonText}>Log in with Spotify</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 350,
    height: 350,
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 40,
  },
  signInButton: {
    backgroundColor: "#131624",
    padding: 15,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderColor: "#C0C0C0",
    borderWidth: 0.8,
  },
  signInButtonText: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#C0C0C0",
  },
  orText: {
    color: "#C0C0C0",
    marginHorizontal: 10,
  },
  passwordButton: {
    backgroundColor: "#20BCF5",
    padding: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  passwordButtonText: {
    color: "white",
    fontWeight: "600",
  },
  footerText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#20BCF5",
    fontWeight: "600",
  },
});
