import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import { useEffect, useState, useCallback } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Breadcrumbs, CreateItemForm, File } from "@/components";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Explore() {
  const router = useRouter();
  const [path, setPath] = useState<string | null>("AppData");
  const [content, setContent] = useState<FileSystem.FileInfo[] | null>(null);

  const getInfo = useCallback(async (path: string) => {
    try {
      const dir = `${FileSystem.documentDirectory}${path}`;
      const directoryInfo = await FileSystem.getInfoAsync(dir, {
        size: true,
      });
      return directoryInfo;
    } catch (err) {
      console.error("Error getting directory info:", err);
      Alert.alert("Error", "Error getting directory info", [{ text: "OK" }]);
    }
  }, []);

  const readDir = useCallback(async (path: string) => {
    try {
      const dir = `${FileSystem.documentDirectory}${path}`;
      const dirInfo = await FileSystem.readDirectoryAsync(dir);

      if (dirInfo.length > 0) {
        const fileInfo = await Promise.all(
          dirInfo.map(async (item) => {
            const itemInfo = await FileSystem.getInfoAsync(`${dir}/${item}`);
            return itemInfo;
          })
        );
        setContent(fileInfo);
      } else {
        setContent([]);
      }
    } catch (err) {
      console.error("Error reading directory:", err);
      Alert.alert("Error", "Error reading directory", [{ text: "OK" }]);
    }
  }, []);

  const makeDir = useCallback(async (name: string) => {
    try {
      const dir = `${FileSystem.documentDirectory}${name}`;
      const dirInfo = await FileSystem.getInfoAsync(dir, { size: true });
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        console.log("Directory created:", dir);
        Alert.alert("Success", "Directory already created", [{ text: "OK" }]);
      } else {
        console.log("Directory already exists:", dir);
        Alert.alert("Error", "Directory already exists", [{ text: "OK" }]);
      }
    } catch (err) {
      console.error("Error creating directory:", err);
      Alert.alert("Error", "Error creating directory", [{ text: "OK" }]);
    }
  }, []);

  const handleCreateFile = useCallback(
    async (name: string) => {
      try {
        const file = `${FileSystem.documentDirectory}${path}/${name}`;
        const fileInfo = await FileSystem.getInfoAsync(file, { size: true });
        if (!fileInfo.exists) {
          await FileSystem.writeAsStringAsync(file, "Hello World", {
            encoding: FileSystem.EncodingType.UTF8,
          });
          console.log("File created:", file);
          Alert.alert("Success", "File created", [{ text: "OK" }]);

          await readDir(path || "");
        } else {
          console.log("File already exists:", file);
          Alert.alert("Error", "File already exists", [{ text: "OK" }]);
        }
      } catch (err) {
        console.error("Error creating file:", err);
        Alert.alert("Error", "Error creating file", [{ text: "OK" }]);
      }
    },
    [path, readDir]
  );

  const handleCreateDir = useCallback(
    async (name: string) => {
      try {
        const dir = `${FileSystem.documentDirectory}${path}/${name}`;
        const dirInfo = await FileSystem.getInfoAsync(dir, { size: true });
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
          console.log("Directory created:", dir);
          Alert.alert("Success", "Directory created", [{ text: "OK" }]);

          await readDir(path || "");
        } else {
          console.log("Directory already exists:", dir);
          Alert.alert("Error", "Directory already exists", [{ text: "OK" }]);
        }
      } catch (err) {
        console.error("Error creating directory:", err);
        Alert.alert("Error", "Error creating directory", [{ text: "OK" }]);
      }
    },
    [path, readDir]
  );

  const handleCreateItem = useCallback(
    async (name: string, isDirectory: boolean) => {
      if (isDirectory) {
        await handleCreateDir(name);
      } else {
        await handleCreateFile(name);
      }
    },
    [handleCreateDir, handleCreateFile]
  );

  const handleGoUp = () => {
    if (!path) {
      router.back();
      return;
    }
    const parts = path.split("/");
    if (parts.length > 1) {
      const parent = parts.slice(0, -1).join("/");
      setPath(parent);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (path) {
      (async () => {
        const dirInfo = await getInfo(path);
        console.log("Directory info:", dirInfo);
        if (
          dirInfo &&
          dirInfo.hasOwnProperty("exists") &&
          dirInfo["exists"] == false &&
          path == "AppData"
        ) {
          await makeDir(path);
        }

        await readDir(path);
      })();
    }
  }, [path]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={handleGoUp}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Feather name="arrow-left" size={24} color="black" />
          <Text style={styles.title}>Back</Text>
        </Pressable>
        <CreateItemForm onCreate={handleCreateItem} />
      </View>

      <Breadcrumbs path={path ?? ""} onClick={(p) => setPath(p)} />

      {content && content.length > 0 ? (
        <FlatList
          data={content}
          renderItem={({ item }) => (
            <File info={item} onClick={(p, isDir) => isDir && setPath(p)} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={({ isDirectory, uri }) =>
            `${isDirectory ? "dir" : "file"}-${uri}`
          }
        />
      ) : (
        <View style={styles.noContent}>
          <AntDesign name="frowno" size={100} color="#c2c2c2" />
        </View>
      )}
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
  noContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
