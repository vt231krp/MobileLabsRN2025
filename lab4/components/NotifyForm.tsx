import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Platform,
  Pressable,
} from "react-native";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function NotifyForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const showPicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: "date",
      onChange: (_, selectedDate) => {
        if (selectedDate) {
          setDate((prev) => {
            const d = new Date(prev);
            d.setFullYear(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate()
            );
            return d;
          });
          DateTimePickerAndroid.open({
            value: date,
            mode: "time",
            is24Hour: true,
            onChange: (_, selectedTime) => {
              if (selectedTime) {
                setDate((prev) => {
                  const t = new Date(prev);
                  t.setHours(
                    selectedTime.getHours(),
                    selectedTime.getMinutes()
                  );
                  return t;
                });
              }
            },
          });
        }
      },
    });
  };

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Date:", date.toLocaleString());
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
      <Pressable onPress={showPicker} style={{ width: "100%" }}>
        <TextInput
          style={styles.input}
          value={date.toLocaleString()}
          editable={false}
          placeholder="Date/Time"
        />
      </Pressable>
      <View style={{ width: "100%" }}>
        <Button title="Create Reminder" onPress={handleSubmit} />
      </View>
    </View>
  );
}

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
