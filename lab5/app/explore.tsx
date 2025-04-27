import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Breadcrumbs, CreateItemForm, File } from "@/components";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useModalContext } from "@/contexts/ModalContext";
import { FileInfoModal } from "@/components";
import { useFileContext } from "@/contexts/FileContext";

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
            <File
              info={item}
              onClick={(p, isDir) => isDir && setPath(p)}
              onLongPress={() => {
                setModalContent(() => <FileInfoModal info={item} />);
                setIsVisible(true);
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={({ isDirectory, uri }) =>
            `${isDirectory ? "dir" : "file"}-${uri}`
          }
        />
      ) : (
        <View style={styles.noContent}>
          <AntDesign name="folderopen" size={100} color="#c2c2c2" />
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
