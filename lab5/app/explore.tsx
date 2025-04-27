import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Breadcrumbs, CreateItemForm, File } from "@/components";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useModalContext } from "@/contexts/ModalContext";
import { FileInfoModal } from "@/components";
import { useFileContext } from "@/contexts/FileContext";
import * as FileSystem from "expo-file-system";

export default function Explore() {
  const router = useRouter();
  const {
    path,
    setPath,
    content,
    readDir,
    makeDir,
    getInfo,
    handleCreateItem,
  } = useFileContext();

  const { setContent: setModalContent, setIsVisible } = useModalContext();

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

  const getListData = () => {
    if (!path || path === "AppData") {
      return content;
    }

    const parentItem: FileSystem.FileInfo = {
      uri: "parent_directory",
      isDirectory: true,
      size: 0,
      modificationTime: 0,
      exists: true,
      name: "..",
    } as FileSystem.FileInfo;

    return [parentItem, ...(content || [])];
  };

  const handleItemClick = (p: string, isDir: boolean) => {
    if (p === "parent_directory") {
      handleGoUp();
      return;
    }

    if (isDir) {
      setPath(p);
      return;
    }

    const fileExtension = p.split(".").pop();
    if (fileExtension === "txt") {
      router.push(`/editor?path=${p}`);
    } else {
      Alert.alert("Error", "Unsupported file type", [{ text: "OK" }]);
    }
  };

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

      <FlatList
        data={getListData()}
        renderItem={({ item }) => {
          if (item.uri === "parent_directory") {
            const parentInfo: FileSystem.FileInfo = {
              ...item,
              uri: `${FileSystem.documentDirectory}..`,
            };

            return <File info={parentInfo} onClick={() => handleGoUp()} />;
          }

          return (
            <File
              info={item}
              onClick={handleItemClick}
              onLongPress={() => {
                setModalContent(() => <FileInfoModal info={item} />);
                setIsVisible(true);
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.uri}
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
  noContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
