import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Check Token Validity
export const checkTokenValidity = async () => {
  const expirationDate = await AsyncStorage.getItem("expirationDate");
  if (!expirationDate) return false;
  return Date.now() < parseInt(expirationDate, 10);
};

// Refresh Access Token
export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.error("No refresh token found.");
    return null;
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: "PASTE_YOUR_CLIENT_ID_HERE", // Update this to match Spotify's dashboard
          client_secret: "PASTE_YOUR_CLIENT_SECRET_HERE", // Update this to match Spotify's dashboard
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const newAccessToken = response.data.access_token;
    const newExpirationDate = Date.now() + response.data.expires_in * 1000;

    await AsyncStorage.setItem("token", newAccessToken);
    await AsyncStorage.setItem("expirationDate", newExpirationDate.toString());

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
    return null;
  }
};

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
    console.log("Top Artists Response:", response.data.items); // Log the API response
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
    console.log("Saved Tracks Response:", data.items); // Log the API response
    return data.items || [];
  } catch (err) {
    console.error("Error fetching liked songs:", err.message);
    return { error: err.message };
  }
};

// Spotify Search Function
export const searchSpotify = async (query) => {
  const token = await AsyncStorage.getItem("token");

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Search Response:", response.data.tracks.items); // Log the API response
    return response.data.tracks.items || [];
  } catch (err) {
    console.error("Error searching Spotify:", err.message);
    return [];
  }
};

// Fetch Tracks
export const fetchTracks = async () => {
  let token = await AsyncStorage.getItem("token");
  const isValid = await checkTokenValidity();

  if (!isValid) {
    token = await refreshAccessToken();
    if (!token) {
      console.error("Failed to refresh access token");
      return [];
    }
  }

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Top Tracks Response:", response.data.items); // Log the API response
    return response.data.items.map((track) => ({
      id: track.id,
      name: track.name,
      uri: track.uri,
      album: track.album,
      artists: track.artists,
    }));
  } catch (error) {
    console.error("Error fetching tracks", error);
    return [];
  }
};

export const getAvailableDevices = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available");
    return [];
  }

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Devices fetched:", response.data.devices); // Enhanced logging
    if (response.data.devices.length === 0) {
      console.error("No devices found.");
    }
    return response.data.devices;
  } catch (error) {
    console.error(
      "Error fetching devices",
      error.response?.data || error.message
    );
    return [];
  }
};

// Transfer Playback to Device
export const transferPlaybackToDevice = async (deviceId) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available");
    return;
  }

  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player",
      {
        device_ids: [deviceId],
        play: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(`Playback transferred with status: ${response.status}`);
  } catch (error) {
    console.error(
      "Error transferring playback",
      error.response?.data || error.message
    );
  }
};

// Play Track
export const playTrack = async (trackUri) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available");
    return;
  }

  const devices = await getAvailableDevices(); // Fetch devices
  if (devices.length === 0) {
    console.error("No available devices found");
    return;
  }

  const deviceId = devices[0].id; // Use the first available device

  await transferPlaybackToDevice(deviceId); // Transfer playback to the device

  try {
    // Play the track on the specified device
    await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        uris: [trackUri],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`Playing track: ${trackUri}`);
  } catch (error) {
    console.error("Error playing track", error.response?.data || error.message);
  }
};

// Fetch Currently Playing Track
let isTokenInvalid = false;

export const getCurrentlyPlaying = async () => {
  // Stop further API calls if the token is invalid
  if (isTokenInvalid) {
    console.warn("Token is invalid. Stopping API calls.");
    return null;
  }

  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available.");
    return null;
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Contains current playback data
  } catch (error) {
    if (error.response?.status === 401) {
      isTokenInvalid = true; // Mark token as invalid
      console.error("Error fetching currently playing: Invalid token.");
    } else {
      console.error("Error fetching currently playing:", error.message);
    }
    return null;
  }
};

// Pause Playback
export const pausePlayback = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return;

  try {
    await axios.put(
      "https://api.spotify.com/v1/me/player/pause",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error pausing playback:", error.message);
  }
};

//skip to next track
export const skipToNext = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available");
    return;
  }

  try {
    await axios.post(
      "https://api.spotify.com/v1/me/player/next",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Skipped to next track");
  } catch (error) {
    console.error("Error skipping to next track:", error.message);
  }
};

//skip to previous track
export const skipToPrevious = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    console.error("No access token available");
    return;
  }

  // Check if skipping is allowed
  const canSkipToPrevious = await checkSkipToPrevious();
  if (!canSkipToPrevious) {
    console.error(
      "Cannot skip to previous track. Ensure the playback context includes multiple tracks."
    );
    return;
  }

  try {
    await axios.post(
      "https://api.spotify.com/v1/me/player/previous",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Skipped to previous track");
  } catch (error) {
    console.error("Error skipping to previous track:", error.message);
  }
};

// Resume Playback
export const resumePlayback = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available");
    return;
  }

  try {
    // Call the "play" endpoint without providing a new URI to resume playback
    await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error resuming playback:", error.message);
  }
};

// Add a Track to Liked Songs
export const addToLikedSongs = async (trackId) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available");
    return { error: "No access token available" };
  }

  try {
    await axios.put(
      `https://api.spotify.com/v1/me/tracks`,
      { ids: [trackId] }, // Spotify API requires the track ID in an array
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`Track ${trackId} added to Liked Songs`);
    return { success: true };
  } catch (error) {
    console.error("Error adding track to Liked Songs:", error.message);
    return { error: error.message };
  }
};

// Remove a Track from Liked Songs
export const removeTrackFromLiked = async (trackId) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available");
    return { error: "No access token available" };
  }

  try {
    await axios.delete(`https://api.spotify.com/v1/me/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { ids: [trackId] }, // Spotify API requires track IDs in an array
    });
    console.log(`Track ${trackId} removed from Liked Songs`);
    return { success: true };
  } catch (error) {
    console.error("Error removing track from Liked Songs:", error.message);
    return { error: error.message };
  }
};

export const fetchArtistTracks = async (artistId) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available");
    return [];
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.tracks; // Return tracks
  } catch (error) {
    console.error("Error fetching tracks by artist:", error.message);
    return [];
  }
};

export const fetchTracksByArtist = async (artistId) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("No access token available");
    return [];
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.tracks; // Return the tracks array
  } catch (error) {
    console.error("Error fetching tracks by artist:", error.message);
    return [];
  }
};
