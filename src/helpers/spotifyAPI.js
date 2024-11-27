import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkTokenValidity } from "../utils/authHelpers";

// Get User Profile
export const getUserProfile = async () => {
  const isValid = await checkTokenValidity();
  if (!isValid) {
    return { error: "Token is invalid" };
  }

  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    return { error: err.message };
  }
};

// Get Recently Played Songs
export const getRecentlyPlayed = async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=6",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.items || [];
  } catch (err) {
    console.error("Error fetching recently played:", err.message);
    return [];
  }
};

// Get Top Artists
export const getTopArtists = async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=5",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.items || [];
  } catch (err) {
    console.error("Error fetching top artists:", err.message);
    return [];
  }
};

// Get Liked Songs
export const getSavedTracks = async () => {
  const accessToken = await AsyncStorage.getItem("token");
  if (!accessToken) {
    console.error("No access token found.");
    return { error: "No access token found." };
  }

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/tracks?offset=0&limit=50",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch liked songs:", response.statusText);
      return { error: "Failed to fetch liked songs." };
    }

    const data = await response.json();
    return data.items || [];
  } catch (err) {
    console.error("Error fetching liked songs:", err.message);
    return { error: err.message };
  }
};
