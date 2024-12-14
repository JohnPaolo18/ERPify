import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
<<<<<<< Updated upstream
  Pressable,
=======
  TouchableOpacity,
  Alert,
>>>>>>> Stashed changes
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
<<<<<<< Updated upstream
import { getSavedTracks } from "../helpers/spotifyAPI"; // Import helper
=======
import {
  getSavedTracks,
  playTrack,
  removeTrackFromLiked,
} from "../helpers/spotifyAPI";
>>>>>>> Stashed changes

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

  const handlePlayTrack = (trackUri) => {
    if (trackUri) {
      playTrack(trackUri);
    } else {
      Alert.alert("Playback not available", "This track does not have a URI.");
    }
  };

  const handleRemoveLiked = async (trackId) => {
    try {
      const response = await removeTrackFromLiked(trackId);
      if (response.success) {
        setSavedTracks((currentTracks) =>
          currentTracks.filter((item) => item.track.id !== trackId)
        );
        Alert.alert(
          "Removed",
          "The song has been removed from your Liked Songs."
        );
      } else {
        Alert.alert("Error", "Failed to remove the song from Liked Songs.");
      }
    } catch (error) {
      console.error("Error removing liked song:", error.message);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  const renderTrackItem = ({ item }) => {
    const track = item.track;

    return (
<<<<<<< Updated upstream
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
=======
      <View style={styles.resultItem}>
        {track.album?.images?.[0]?.url && (
          <Image
            source={{ uri: track.album.images[0].url }}
            style={styles.image}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.songName}>{track.name}</Text>
          <Text style={styles.artistName}>
            {track.artists.map((artist) => artist.name).join(", ")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handlePlayTrack(track.uri)}
          style={styles.playButton}
        >
          <AntDesign name="play" size={24} color="#7CEEFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemoveLiked(track.id)}
          style={styles.heartButton}
        >
          <Entypo name="heart" size={24} color="#7CEEFF" />
        </TouchableOpacity>
>>>>>>> Stashed changes
      </View>
    );
  };

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={styles.container}>
      {/* Header */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Liked Songs</Text>
      </View>

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
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 8,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  songName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  artistName: {
    color: "#B3B3B3",
    fontSize: 14,
    marginTop: 3,
  },
  playButton: {
    marginHorizontal: 10,
  },
  heartButton: {
    marginHorizontal: 10,
  },
  placeholderText: {
    color: "#B3B3B3",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
});
