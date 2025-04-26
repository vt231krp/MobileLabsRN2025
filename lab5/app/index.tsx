import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { formatBytes } from "@/utils/formatUtils";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";

export default function Index() {
  const [totalDiskCapacity, setTotalDiskCapacity] = useState(0);
  const [freeDiskCapacity, setFreeDiskCapacity] = useState(0);
  const [usedDiskCapacity, setUsedDiskCapacity] = useState(0);

  const getMemoryInfo = async () => {
    try {
      const totalDiskCapacity = await FileSystem.getTotalDiskCapacityAsync();
      const freeDiskCapacity = await FileSystem.getFreeDiskStorageAsync();
      const usedDiskCapacity = totalDiskCapacity - freeDiskCapacity;

      setTotalDiskCapacity(totalDiskCapacity);
      setFreeDiskCapacity(freeDiskCapacity);
      setUsedDiskCapacity(usedDiskCapacity);
    } catch (error) {
      console.error("Error getting file system info:", error);
    }
  };

  useEffect(() => {
    getMemoryInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Info</Text>

      <View style={styles.memoryInfo}>
        <View style={styles.memoryInfoItem}>
          <Text>Total</Text>
          <Text style={styles.memoryValue}>
            {formatBytes(totalDiskCapacity)}
          </Text>
        </View>

        <View style={styles.memoryInfoItem}>
          <Text>Free</Text>
          <Text style={styles.memoryValue}>
            {formatBytes(freeDiskCapacity)}
          </Text>
        </View>

        <View style={styles.memoryInfoItem}>
          <Text>Used</Text>
          <Text style={styles.memoryValue}>
            {formatBytes(usedDiskCapacity)}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Storage</Text>

      <Link href={"/dir"} style={styles.explore}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AntDesign name="folder1" size={24} color="black" />
          <Text style={styles.memoryValue}>Explore</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  memoryInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
  },
  memoryInfoItem: {
    flex: 1,
    alignItems: "center",
  },
  memoryValue: {
    fontSize: 18,
    fontWeight: 700,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: "#111212",
    marginLeft: 15,
  },
  explore: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
  },
});
