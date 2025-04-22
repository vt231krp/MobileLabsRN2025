import { View, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";
import { OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";
import DatePicker from "react-native-date-picker";
import { useNotifyContext } from "@/hooks/useNotifyContext";

export const NotifyForm = () => {
  const oneSignalAppId = Constants.expoConfig?.extra?.oneSignalAppId;
  const oneSignalApiKey = process.env.EXPO_PUBLIC_ONESIGNAL_API_KEY;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const { addNotification } = useNotifyContext();

  const sendPushNotification = async (externalId: string) => {
    try {
      const res = await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          Authorization: `Key ${oneSignalApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          app_id: oneSignalAppId,
          headings: { en: name },
          contents: { en: description },
          include_external_user_ids: [externalId],
          send_after: date.toISOString(),
        }),
      });
      const data = await res.json();
      console.log("Notification sent:", data);

      if (data?.id) {
        const notification = {
          id: data.id,
          name,
          description,
          date,
        };
        addNotification(notification);
      } else {
        console.error("Failed to send notification:", data);
      }
    } catch (e) {
      console.error("Push error:", e);
    }
  };

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Date:", date.toLocaleString());

    OneSignal.login("vt231_krp");

    sendPushNotification("vt231_krp");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
      />
      <DatePicker
        date={date}
        onDateChange={setDate}
        mode="datetime"
        theme="light"
      />
      <View style={{ width: "100%" }}>
        <Button title="Create Reminder" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
});
