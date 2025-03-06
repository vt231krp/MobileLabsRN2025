import { View, Text, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function GalleryScreen() {
  const images = Array.from({ length: 20 }).map((_, index) => ({
    id: index.toString(),
    source: require("../../assets/images/react-logo.png"),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallery</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={images}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={item.source} alt="Image" style={styles.image} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  listItem: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
  },
});
