import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { INotification } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNotifyContext } from "@/hooks/useNotifyContext";
import Constants from "expo-constants";

interface NotifyListItemProps {
  notification: INotification;
}

export const NotifyListItem = ({ notification }: NotifyListItemProps) => {
  const { removeNotification } = useNotifyContext();
  const oneSignalAppId = Constants.expoConfig?.extra?.oneSignalAppId;
  const oneSignalApiKey = process.env.EXPO_PUBLIC_ONESIGNAL_API_KEY;

  const handleCancelNotification = async (messageId: string) => {
    fetch(
      `https://api.onesignal.com/notifications/${messageId}?app_id=${oneSignalAppId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Key ${oneSignalApiKey}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Notification cancelled:", data);
        if (data.success) {
          removeNotification(notification.id);
        }
      })
      .catch((error) => {
        console.error("Error cancelling notification:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{notification.name}</Text>
      <Text style={styles.description}>{notification.description}</Text>
      <Text style={styles.date}>{notification.date.toLocaleString()}</Text>
      <TouchableHighlight
        style={styles.trash}
        underlayColor={"#f55d42"}
        onPress={() => {
          handleCancelNotification(notification.id);
        }}
      >
        <FontAwesome name="trash" size={24} color="black" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "medium",
  },
  date: {
    fontSize: 14,
    fontWeight: "light",
    color: "gray",
  },
  trash: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "red",
    borderRadius: 5,
    padding: 5,
  },
});
