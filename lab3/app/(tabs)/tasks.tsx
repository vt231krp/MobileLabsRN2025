import { View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { useTaskContext } from "@/hooks/useTaskContext";
import { FlatList } from "react-native-gesture-handler";

export default function TasksScreen() {
  const { tasks } = useTaskContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text>{item.name}</Text>
            <Text style={{ color: item.isCompleted ? "green" : "red" }}>
              {item.isCompleted ? "Completed" : "Not Completed"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
