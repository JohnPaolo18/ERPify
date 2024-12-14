import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import ArtistCard from "../components/ArtistCard";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import SearchBar from "../components/SearchBar";
import {
  getUserProfile,
  getRecentlyPlayed,
  getTopArtists,
<<<<<<< Updated upstream
=======
  fetchTracks,
  playTrack,
>>>>>>> Stashed changes
} from "../helpers/spotifyAPI";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getUserProfile();
      if (profileData.error) {
        navigation.navigate("Login");
      } else {
        setUserProfile(profileData);
      }

      const recentlyPlayedData = await getRecentlyPlayed();
      setRecentlyPlayed(recentlyPlayedData);

      const topArtistsData = await getTopArtists();
      setTopArtists(topArtistsData);
    };

    fetchData();
  }, []);

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) return "Good Morning";
    if (currentTime < 16) return "Good Afternoon";
    return "Good Evening";
  };
  const message = greetingMessage();

  useEffect(() => {
    const fetchArtists = async () => {
      const artists = await getTopArtists();
      setTopArtists(artists);
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    console.log("Top Artists:", topArtists); // This will log the `topArtists` array to the console
  }, [topArtists]); // It will log whenever `topArtists` changes

  const handleArtistPress = (artistId) => {
    navigation.navigate("ArtistTracks", { artistId });
  };

  return (
    // main container
    <LinearGradient colors={["#040306", "#131624"]} style={styles.container}>
      <FlatList
        data={[{ key: "Header" }]}
        renderItem={() => (
          <>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.profileSection}>
                <Image
                  source={{
                    uri:
                      userProfile?.images?.[0]?.url ||
                      "https://via.placeholder.com/150",
                  }}
                  style={styles.profileImage}
                />
                <Text style={styles.greetingMessage}>{message}</Text>
              </View>
              <MaterialCommunityIcons
                name="lightning-bolt-outline"
                size={24}
                color="white"
              />
            </View>

            {/* Search Bar */}
            <SearchBar />

            {/* Liked Songs Section */}
            <View style={styles.likedSongsContainer}>
              <Pressable
                onPress={() => navigation.navigate("Liked")}
                style={styles.likedSongsCard}
              >
                <LinearGradient colors={["#33006F", "#FFFFFF"]}>
                  <View style={styles.iconContainer}>
                    <AntDesign name="heart" size={24} color="white" />
                  </View>
                </LinearGradient>
                <Text style={styles.likedSongsText}>Liked Songs</Text>
              </Pressable>
            </View>

            {/* Recently Played Section */}
            <Text style={styles.sectionTitle}>Recently Played</Text>
            <FlatList
              data={recentlyPlayed}
<<<<<<< Updated upstream
              renderItem={({ item }) => <RecentlyPlayedCard item={item} />}
=======
              renderItem={({ item }) => (
                <RecentlyPlayedCard
                  item={item}
                  onPress={() => playTrack(item.track.uri)}
                />
              )}
>>>>>>> Stashed changes
              keyExtractor={(item, index) => `${item.track.id}-${index}`}
              horizontal
              contentContainerStyle={styles.recentlyPlayedContent}
              showsHorizontalScrollIndicator={false}
            />

            {/* Top Artists Section */}
            <Text style={styles.sectionTitle}>Your Top Artists</Text>
          </>
        )}
        ListFooterComponent={
          <FlatList
            data={topArtists}
            renderItem={({ item }) => (
              <ArtistCard item={item} onPress={handleArtistPress} />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={styles.topArtistsContent}
            showsHorizontalScrollIndicator={false}
          />
        }
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greetingMessage: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    margin: 10,
  },
  filterButton: {
    backgroundColor: "#282828",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    color: "white",
    fontSize: 14,
  },
  likedSongsContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  likedSongsCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#202020",
    borderRadius: 4,
    padding: 10,
    marginRight: 5,
  },
  iconContainer: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  likedSongsText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 10,
  },
  randomArtistCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#202020",
    borderRadius: 4,
    padding: 10,
    marginLeft: 5,
  },
  randomArtistImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  randomArtistText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 10,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  recentlyPlayedContent: {
    paddingLeft: 15,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  topArtistsContent: {
    paddingLeft: 15,
  },
});
