// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
// import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { fetchPlaylistTracks, playTrack, addToLikedSongs } from "../helpers/spotifyAPI";
// import { LinearGradient } from "expo-linear-gradient";

// const PlaylistTracksScreen = ({ route }) => {
//   const { playlistId } = route.params;
//   const [tracks, setTracks] = useState([]);
//   const [likedSongs, setLikedSongs] = useState(new Set());
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchTracks = async () => {
//       const playlistTracks = await fetchPlaylistTracks(playlistId);
//       setTracks(
//         playlistTracks.map((item) => ({
//           ...item,
//           isLiked: likedSongs.has(item.id),
//         }))
//       );
//     };
//     fetchTracks();
//   }, [playlistId, likedSongs]);

//   const handlePlayTrack = async (trackUri) => {
//     try {
//       await playTrack(trackUri);
//       console.log("Playing track:", trackUri);
//     } catch (error) {
//       console.error("Error playing track:", error.message);
//     }
//   };

//   const handleAddToLiked = async (item) => {
//     try {
//       const response = await addToLikedSongs(item.id);
//       if (response.success) {
//         Alert.alert("Success", `"${item.name}" has been added to Liked Songs.`);
//         setLikedSongs(new Set([...likedSongs, item.id]));
//       } else {
//         Alert.alert("Error", "Failed to add the song to Liked Songs.");
//       }
//     } catch (error) {
//       console.error("Error adding to Liked Songs:", error);
//       Alert.alert("Error", "An unexpected error occurred.");
//     }
//   };

//   const renderTrackItem = ({ item }) => (
//     <View style={styles.resultItem}>
//       {item.album?.images?.[0]?.url && (
//         <Image source={{ uri: item.album.images[0].url }} style={styles.image} />
//       )}
//       <View style={styles.textContainer}>
//         <Text style={styles.songName}>{item.name}</Text>
//         <Text style={styles.artistName}>{item.artists.map((artist) => artist.name).join(", ")}</Text>
//       </View>
//       <TouchableOpacity onPress={() => handlePlayTrack(item.uri)} style={styles.playButton}>
//         <AntDesign name="play" size={24} color="#7CEEFF" />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleAddToLiked(item)} style={styles.heartButton}>
//         <Entypo name={item.isLiked ? "heart" : "heart-outlined"} size={24} color={item.isLiked ? "#7CEEFF" : "white"} />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <LinearGradient colors={["#040306", "#131624"]} style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Tracks in Playlist</Text>
//       </View>
//       {tracks.length > 0 ? (
//         <FlatList
//           data={tracks}
//           renderItem={renderTrackItem}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContent}
//         />
//       ) : (
//         <Text style={styles.placeholderText}>No tracks available in this playlist.</Text>
//       )}
//     </LinearGradient>
//   );
// };

// export default PlaylistTracksScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 15,
//     marginBottom: 15,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerText: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   listContent: {
//     paddingHorizontal: 15,
//     paddingBottom: 20,
//   },
//   resultItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#282828",
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 4,
//     marginRight: 10,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   songName: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   artistName: {
//     color: "#B3B3B3",
//     fontSize: 14,
//     marginTop: 3,
//   },
//   playButton: {
//     marginHorizontal: 10,
//   },
//   heartButton: {
//     marginHorizontal: 10,
//   },
//   placeholderText: {
//     color: "#B3B3B3",
//     fontSize: 16,
//     textAlign: "center",
//     marginTop: 50,
//   },
// });

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
  fetchPlaylistTracks,
  playTrack,
  addToLikedSongs,
} from "../helpers/spotifyAPI";
import { LinearGradient } from "expo-linear-gradient";

const PlaylistTracksScreen = ({ route }) => {
  const { playlistId } = route.params;
  const [tracks, setTracks] = useState([]);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTracks = async () => {
      const playlistTracks = await fetchPlaylistTracks(playlistId);

      // Deduplicate tracks based on `id`
      const uniqueTracks = Array.from(
        new Map(playlistTracks.map((item) => [item.id, item])).values()
      );

      setTracks(
        uniqueTracks.map((item) => ({
          ...item,
          isLiked: likedSongs.has(item.id),
        }))
      );
    };

    fetchTracks();
  }, [playlistId, likedSongs]);

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
        <Text style={styles.artistName}>
          {item.artists.map((artist) => artist.name).join(", ")}
        </Text>
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tracks in Playlist</Text>
      </View>
      {tracks.length > 0 ? (
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.placeholderText}>
          No tracks available in this playlist.
        </Text>
      )}
    </LinearGradient>
  );
};

export default PlaylistTracksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
