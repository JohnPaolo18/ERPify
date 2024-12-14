import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ERPifyLogo from "../assets/icons/ERPify.png";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  // Generate the redirect URI with the custom scheme
  const redirectUri = makeRedirectUri({
<<<<<<< Updated upstream
    native: "erpify://", // Use the custom scheme defined in app.json
=======
    native: "exp://10.10.4.206:8081", // Use the custom scheme defined in app.json
>>>>>>> Stashed changes
  });
  console.log("Generated Redirect URI:", redirectUri);

  const [request, response, promptAsync] = useAuthRequest(
    {
<<<<<<< Updated upstream
      clientId: "525fb68a3b7a4822abd082209d537be8",
=======
      clientId: "4e94ff6dea6f484bb7e898eb00cef58b",
>>>>>>> Stashed changes
      scopes: [
        "user-read-email",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "user-library-read",
        "user-library-modify",
        "user-read-recently-played",
        "user-top-read",
      ],
      responseType: "token", // Use the Implicit Grant Flow
      redirectUri: makeRedirectUri({
<<<<<<< Updated upstream
        native: "erpify://", // Use the custom scheme defined in app.json
=======
        native: "exp://10.10.4.206:8081", // Use the custom scheme defined in app.json
>>>>>>> Stashed changes
      }),
    },
    { authorizationEndpoint: "https://accounts.spotify.com/authorize" }
  );

  useEffect(() => {
    if (response?.type === "success" && response.params.access_token) {
      const expirationDate = Date.now() + response.params.expires_in * 1000;
      AsyncStorage.setItem("token", response.params.access_token)
        .then(() => {
          console.log("Token set in storage:", response.params.access_token);
          AsyncStorage.setItem("expirationDate", expirationDate.toString());
        })
        .then(() => {
          console.log("Expiration date set in storage");
          navigation.navigate("Main");
        })
        .catch((error) => {
          console.error("AsyncStorage error:", error.message);
        });
    }
  }, [response]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={ERPifyLogo} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Let's get you in</Text>

        {/* Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          {/* <Text style={styles.orText}>or</Text> */}
          <View style={styles.separatorLine} />
        </View>

        {/* Spotify Login Button */}
        <Pressable style={styles.LoginButton} onPress={() => promptAsync()}>
          <Text style={styles.LoginButtonText}>Log in with Spotify</Text>
        </Pressable>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

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

  LoginButton: {
    backgroundColor: "#20BCF5",
    padding: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  LoginButtonText: {
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

export default LoginScreen;
