// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import Navigation from "./src/StackNavigator";

// export default function App() {
//   return (
//     <>
//       <Navigation />
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/StackNavigator";
import MusicControls from "./src/components/MusicControls";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState("");

  const onReady = () => {
    // Ensure the navigation is initialized
    const initialRoute = navigationRef.getCurrentRoute();
    setCurrentRoute(initialRoute?.name || "");
  };

  const onStateChange = () => {
    // Update the current route when navigation state changes
    const route = navigationRef.getCurrentRoute();
    setCurrentRoute(route?.name || "");
  };

  return (
    <View style={styles.container}>
      <NavigationContainer
        ref={navigationRef}
        onReady={onReady}
        onStateChange={onStateChange}
      >
        <Navigation />
      </NavigationContainer>
      {/* Conditionally render MusicControls */}
      {currentRoute && currentRoute !== "Login" && <MusicControls />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
