import { FileInfo } from "expo-file-system";
import * as FileSystem from "expo-file-system";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

interface FileProps {
  info: FileInfo;
  onClick: (path: string, isDirectory: boolean) => void;
  onLongPress?: () => void;
}

export const File = ({ info, onClick, onLongPress }: FileProps) => {
  const { uri, isDirectory } = info;
  const fileName = uri.split("/").pop() || "Unknown File";

  const getCleanPath = (uri: string) => {
    return uri.replace(FileSystem.documentDirectory || "", "");
  };

  console.log("File info:", info);

  return (
    <TouchableHighlight
      underlayColor="#c2c2c2"
      style={{ borderRadius: 10 }}
      onPress={() => onClick(getCleanPath(uri), !!isDirectory)}
      onLongPress={onLongPress}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {isDirectory ? (
            <Entypo name="folder" size={24} color="#FFD700" />
          ) : (
            <AntDesign name="filetext1" size={24} color="black" />
          )}
          <Text>{fileName}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
  },
});
