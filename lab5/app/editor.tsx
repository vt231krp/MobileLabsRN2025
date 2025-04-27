import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function Edit() {
  const router = useRouter();
  const { path } = useLocalSearchParams();
  const [content, setContent] = useState<string | null>(null);

  const fileUri = `${FileSystem.documentDirectory}${path}`;

  const getFileContent = async () => {
    try {
      const content = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log("File content:", content);
      setContent(content);
    } catch (err) {
      console.error("Error reading file:", err);
      Alert.alert("Error", "Error reading file", [{ text: "OK" }]);
    }
  };

  useEffect(() => {
    if (path) {
      getFileContent();
    }
  }, [path]);

  const handleSave = async () => {
    try {
      await FileSystem.writeAsStringAsync(fileUri, content || "", {
        encoding: FileSystem.EncodingType.UTF8,
      });
      Alert.alert("Success", "File saved successfully", [{ text: "OK" }]);
      router.back();
    } catch (err) {
      console.error("Error saving file:", err);
      Alert.alert("Error", "Error saving file", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Feather name="arrow-left" size={24} color="black" />
          <Text style={styles.title}>Back</Text>
        </Pressable>
        <Button title="Save" onPress={handleSave} />
      </View>
      <TextInput
        value={content ?? ""}
        onChangeText={setContent}
        multiline
        style={{ flex: 1, textAlignVertical: "top" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
