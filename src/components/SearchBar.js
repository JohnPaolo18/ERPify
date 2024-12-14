<<<<<<< Updated upstream
import React, { useState } from "react";
import { TextInput, Button, FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { searchSpotify } from "../helpers/spotifyAPI";
=======
import React, { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  searchSpotify,
  playTrack,
  addToLikedSongs,
} from "../helpers/spotifyAPI";
import { AntDesign } from "@expo/vector-icons";
>>>>>>> Stashed changes

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [likedSongs, setLikedSongs] = useState(new Set());

  useEffect(() => {
    // This will update the liked status in the search results when likedSongs changes
    setSearchResults((currentResults) =>
      currentResults.map((song) => ({
        ...song,
        isLiked: likedSongs.has(song.id),
      }))
    );
  }, [likedSongs]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

<<<<<<< Updated upstream
    const results = await searchSpotify(query);
    setSearchResults(results);
=======
    try {
      const results = await searchSpotify(query);
      setSearchResults(
        results.map((item) => ({
          ...item,
          isLiked: likedSongs.has(item.id),
        }))
      );
    } catch (error) {
      console.error("Error searching Spotify:", error);
      Alert.alert("Error", "Failed to search Spotify. Please try again.");
    }
>>>>>>> Stashed changes
  };

  const handleResultClick = (item) => {
    console.log("Selected Item: ", item);
    setQuery(item.name);
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

  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Search Input */}
        <TextInput
          style={styles.input}
          placeholder="Search for songs, artists, or albums"
          placeholderTextColor="#bbb"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        {/* clearSearch */}
        {query !== "" && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <Button title="Search" onPress={handleSearch} color="#20BCF5" />

      {/* Scrollable list with search results */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              {item.album?.images?.[0]?.url && (
                <Image
                  source={{ uri: item.album.images[0].url }}
                  style={styles.image}
                />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.songName}>{item.name}</Text>
                <Text style={styles.artistName}>{item.artists[0]?.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleResultClick(item)}
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
          )}
          contentContainerStyle={styles.resultsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#040306",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 60, 
    backgroundColor: "#282828",
    color: "white",
    borderRadius: 5,
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 7, 
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: {
    color: "#20BCF5",
    fontSize: 14,
    fontWeight: "bold",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  songName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  artistName: {
    color: "gray",
    fontSize: 14,
  },
<<<<<<< Updated upstream
  resultsContainer: {
    paddingBottom: 20,
=======
  playButton: {
    marginHorizontal: 10,
  },
  playText: {
    color: "#1DB954",
    fontSize: 18,
  },
  heartButton: {
    marginHorizontal: 10,
>>>>>>> Stashed changes
  },
});

export default SearchBar;
