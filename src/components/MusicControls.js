import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  getCurrentlyPlaying,
  resumePlayback,
  pausePlayback,
  skipToNext,
  skipToPrevious,
} from "../helpers/spotifyAPI";
import { AntDesign, Foundation } from "@expo/vector-icons";

const MusicControls = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchPlaybackState = async () => {
      const playbackState = await getCurrentlyPlaying();
      if (playbackState) {
        setCurrentTrack(playbackState.item); // Set the currently playing track
        setIsPaused(!playbackState.is_playing); // Update pause state
      }
    };

    fetchPlaybackState();

    // Poll playback state every 5 seconds
    const interval = setInterval(fetchPlaybackState, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = async () => {
    if (isPaused) {
      // Resume playback if paused
      await resumePlayback();
    } else {
      // Pause playback if playing
      await pausePlayback();
    }
    setIsPaused(!isPaused); // Toggle pause state
  };

  if (!currentTrack) {
    // If no track is playing, hide the MusicControls
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.trackInfo}>
        <Text numberOfLines={1} style={styles.trackName}>
          {currentTrack.name}
        </Text>
        <Text numberOfLines={1} style={styles.artistName}>
          {currentTrack.artists.map((artist) => artist.name).join(", ")}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={skipToPrevious} style={styles.controlButton}>
          <Foundation name="previous" size={30} color="#7CEEFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.controlButton}
        >
          {isPaused ? (
            <AntDesign name="play" size={30} color="#7CEEFF" />
          ) : (
            <AntDesign name="pausecircle" size={30} color="#7CEEFF" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext} style={styles.controlButton}>
          <Foundation name="next" size={30} color="#7CEEFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 70,
    width: "100%",
    backgroundColor: "#1c1c1c",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },
  trackName: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  artistName: {
    color: "gray",
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    marginHorizontal: 10,
  },
});

export default MusicControls;
