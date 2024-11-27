import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getSavedTracks } from "../helpers/spotifyAPI"; // Import helper

const LikedSongsScreen = () => {
  const [savedTracks, setSavedTracks] = useState([]);
  const navigation = useNavigation();

  // Fetch Liked Songs when the screen mounts
  useEffect(() => {
    const fetchLikedSongs = async () => {
      const data = await getSavedTracks();
      if (data.error) {
        console.error(data.error); // Handle errors if needed
      } else {
        setSavedTracks(data);
      }
    };

    fetchLikedSongs();
  }, []);

  // Render each track
  const renderTrackItem = ({ item }) => {
    const track = item.track;

    return (
      <View style={styles.trackItem}>
        <Image
          source={{ uri: track?.album?.images?.[0]?.url }}
          style={styles.albumArt}
        />
        <View style={styles.trackInfo}>
          <Text style={styles.trackName} numberOfLines={1}>
            {track?.name}
          </Text>
          <Text style={styles.artistName} numberOfLines={1}>
            {track?.artists?.map((artist) => artist.name).join(", ")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={["#1DB954", "#121212"]} style={styles.container}>
      {/* Header */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.headerText}>Liked Songs</Text>
      </Pressable>

      {/* Liked Songs List */}
      {savedTracks.length > 0 ? (
        <FlatList
          data={savedTracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.track.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.placeholderText}>
          No liked songs found. Start liking songs!
        </Text>
      )}
    </LinearGradient>
  );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 15,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#282828",
    borderRadius: 8,
    padding: 10,
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  trackInfo: {
    marginLeft: 10,
    flex: 1,
  },
  trackName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  artistName: {
    color: "#B3B3B3",
    fontSize: 14,
    marginTop: 3,
  },
  placeholderText: {
    color: "#B3B3B3",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
});
