import { View, StyleSheet, FlatList } from "react-native";
import { useNotifyContext } from "@/hooks/useNotifyContext";
import { NotifyListItem } from "@/components/NotifyListItem";

export const NotifyList = () => {
  const { notifications } = useNotifyContext();

  console.log("Notifications:", notifications);

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        contentContainerStyle={{ paddingTop: 10 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotifyListItem notification={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
  },
});
