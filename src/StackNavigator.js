import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import LoginScreen from "./screens/LoginScreen";
import LikedSongsScreen from "./screens/LikedSongsScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import ArtistTracksScreen from "./screens/ArtistTracksScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          shadowOpacity: 4,
          shadowRadius: 4,
          elevation: 1,
          shadowOffset: {
            width: 0,
            height: -4,
          },
        },
        borderTopWidth: 0,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <AntDesign name="home" size={24} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: "Your Library",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="library-music" size={24} color="white" />
            ) : (
              <MaterialIcons name="library-music" size={24} color="gray" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Liked"
        component={LikedSongsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ArtistTracks"
        component={ArtistTracksScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Navigation;
