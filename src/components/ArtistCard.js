// import { StyleSheet, Text, View, Image } from "react-native";
// import React from "react";

// const ArtistCard = ({ item }) => {
//   return (
//     <View style={{ margin: 10 }}>
//       <Image
//         style={{ width: 130, height: 130, borderRadius: 5 }}
//         source={{ uri: item.images[0].url }}
//       />
//       <Text
//         style={{
//           fontSize: 13,
//           fontWeight: "500",
//           color: "white",
//           marginTop: 10,
//         }}
//       >
//         {item?.name}
//       </Text>
//     </View>
//   );
// };

// export default ArtistCard;

// const styles = StyleSheet.create({});

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ArtistCard = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item.id)} style={styles.card}>
    {item.images?.[0]?.url ? (
      <Image source={{ uri: item.images[0].url }} style={styles.image} />
    ) : (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>No Image</Text>
      </View>
    )}
    <Text style={styles.name}>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "white",
    fontSize: 14,
  },
  name: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
});

export default ArtistCard;
