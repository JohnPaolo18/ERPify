import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  fetchArtistTracks,
  playTrack,
  addToLikedSongs,
} from "../helpers/spotifyAPI";
import { LinearGradient } from "expo-linear-gradient";

const ArtistTracksScreen = ({ route }) => {
  const { artistId } = route.params;
  const [tracks, setTracks] = useState([]);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTracks = async () => {
      const artistTracks = await fetchArtistTracks(artistId);
      setTracks(
        artistTracks.map((item) => ({
          ...item,
          isLiked: likedSongs.has(item.id),
        }))
      );
    };
    fetchTracks();
  }, [artistId, likedSongs]);

  const handlePlayTrack = async (trackUri) => {
    try {
      await playTrack(trackUri);
      console.log("Playing track:", trackUri);
    } catch (error) {
      console.error("Error playing track:", error.message);
    }
  };

  const handleAddToLiked = async (item) => {
    try {
      const response = await addToLikedSongs(item.id);
      if (response.success) {
        Alert.alert("Success", `"${item.name}" has been added to Liked Songs.`);
        setLikedSongs(new Set([...likedSongs, item.id]));
      } else {
        Alert.alert("Error", "Failed to add the song to Liked Songs.");
      }
    } catch (error) {
      console.error("Error adding to Liked Songs:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  const renderTrackItem = ({ item }) => (
    <View style={styles.resultItem}>
      {item.album?.images?.[0]?.url && (
        <Image
          source={{ uri: item.album.images[0].url }}
          style={styles.image}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.songName}>{item.name}</Text>
        <Text style={styles.artistName}>{item.album?.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handlePlayTrack(item.uri)}
        style={styles.playButton}
      >
        <AntDesign name="play" size={24} color="#7CEEFF" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleAddToLiked(item)}
        style={styles.heartButton}
      >
        <Entypo
          name={item.isLiked ? "heart" : "heart-outlined"}
          size={24}
          color={item.isLiked ? "#7CEEFF" : "white"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tracks by Artist</Text>
      </View>

      {/* Artist Tracks List */}
      {tracks.length > 0 ? (
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.placeholderText}>
          No tracks available for this artist.
        </Text>
      )}
    </LinearGradient>
  );
};

export default ArtistTracksScreen;

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
    backgroundColor: "#282828",
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
