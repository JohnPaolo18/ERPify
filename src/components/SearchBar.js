import React, { useState } from "react";
import { TextInput, Button, FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"; 
import { searchSpotify } from "../helpers/spotifyAPI"; 

const SearchBar = () => {
  const [query, setQuery] = useState("");  
  const [searchResults, setSearchResults] = useState([]);  


  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = await searchSpotify(query);  
    setSearchResults(results);  
  };


  const handleResultClick = (item) => {
    console.log("Selected Item: ", item); 
    setQuery(item.name);  
  };

  return (
    <View style={styles.container}> 
      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search for songs, artists, or albums"
        placeholderTextColor="#bbb" 
        value={query}
        onChangeText={setQuery}  
        onSubmitEditing={handleSearch}  
      />
      <Button title="Search" onPress={handleSearch} color="#20BCF5" /> 

      {/* Reset search results if there are no results */}
      {searchResults.length === 0 && query.trim() === "" && (
        <Text style={styles.noResultsText}></Text>
      )}

      {/* Scrollable list with search results */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleResultClick(item)} 
            >
              {/* Song Image */}
              {item.album?.images?.[0]?.url && (
                <Image source={{ uri: item.album.images[0].url }} style={styles.image} />
              )}
              {/* Song Name and Artist */}
              <View style={styles.textContainer}>
                <Text style={styles.songName}>{item.name}</Text>
                <Text style={styles.artistName}>{item.artists[0]?.name}</Text>
              </View>
            </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: "#282828", 
    color: "white",  
    borderRadius: 5,  
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
});

export default SearchBar;
