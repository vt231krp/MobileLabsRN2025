import { View, Text, Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { StyleSheet } from "react-native";

interface News {
  title: string;
  preview: string;
  image: string | null;
  time: Date;
}

export default function HomeScreen() {
  const [news, setNews] = useState<News[]>([
    {
      title: "News Item 1",
      preview: "This is a preview of news item 1.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 2",
      preview: "This is a preview of news item 2.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 3",
      preview: "This is a preview of news item 3.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 4",
      preview: "This is a preview of news item 4.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 5",
      preview: "This is a preview of news item 5.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 6",
      preview: "This is a preview of news item 6.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 1",
      preview: "This is a preview of news item 1.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 2",
      preview: "This is a preview of news item 2.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 3",
      preview: "This is a preview of news item 3.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 4",
      preview: "This is a preview of news item 4.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 5",
      preview: "This is a preview of news item 5.",
      image: null,
      time: new Date(),
    },
    {
      title: "News Item 6",
      preview: "This is a preview of news item 6.",
      image: null,
      time: new Date(),
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
      <FlatList
        style={styles.list}
        data={news}
        renderItem={({ item }) => (
          <View key={item.title} style={styles.listItem}>
            <Image
              source={
                item.image || require("../../assets/images/react-logo.png")
              }
              alt="Image"
              style={styles.image}
            />
            <View>
              <Text>{item.title}</Text>
              <Text>{item.preview}</Text>
              <Text>{item.time.toLocaleTimeString()}</Text>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
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
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  listItem: {
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});
