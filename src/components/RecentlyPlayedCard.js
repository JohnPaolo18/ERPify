import { Text, Pressable, Image, Alert } from "react-native";
import React from "react";
import { playTrack } from "../helpers/spotifyAPI";

const RecentlyPlayedCard = ({ item, onPlay }) => {
  const handlePress = async () => {
    if (item.track.uri) {
      await playTrack(item.track.uri); // Play the track
      if (onPlay) {
        onPlay(); // Trigger the callback to update the parent component
      }
    } else {
      Alert.alert("Playback not available", "This track does not have a URI.");
    }
  };

  return (
    <Pressable onPress={handlePress} style={{ margin: 10 }}>
      <Image
        style={{ width: 130, height: 130, borderRadius: 5 }}
        source={{ uri: item.track.album.images[0].url }}
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
        }}
      >
        {item?.track?.name}
      </Text>
    </Pressable>
  );
};

export default RecentlyPlayedCard;
