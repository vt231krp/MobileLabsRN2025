import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { FileInfo } from "expo-file-system";
import { useModalContext } from "@/contexts/ModalContext";
import { useFileContext } from "@/contexts/FileContext";

interface FileInfoModalProps {
  info: FileInfo;
}

export const FileInfoModal = ({ info }: FileInfoModalProps) => {
  const { setIsVisible } = useModalContext();
  const { handleDelete } = useFileContext();

  const uri = info?.uri || "";
  const isDirectory = info?.isDirectory || false;
  const size =
    info.exists && "size" in info && typeof info.size === "number"
      ? info.size
      : 0;
  const modificationTime =
    info.exists &&
    "modificationTime" in info &&
    typeof info.modificationTime === "number"
      ? info.modificationTime
      : 0;

  const fileName = uri.split("/").pop() || "Unknown";
  const formattedDate = modificationTime
    ? new Date(modificationTime).toLocaleString()
    : "Unknown";
  const formattedSize = `${(size / 1024).toFixed(2)} KB`;
  const fileExtension = uri.split(".").pop() || "Unknown";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fileName}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Type:</Text>
        <Text>{isDirectory ? "Directory" : `File (${fileExtension})`}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Size:</Text>
        <Text>{formattedSize}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Modified:</Text>
        <Text>{formattedDate}</Text>
      </View>
      <Button
        title="Delete"
        onPress={() => {
          setIsVisible(false);
          handleDelete(uri, fileName);
        }}
        color="#fc2003"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    width: 80,
  },
});
