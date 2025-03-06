import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = () => {
    console.log({
      email,
      password,
      passwordRepeat,
      firstName,
      lastName,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View>
        <Text>Email:</Text>
        <TextInput style={styles.input} onChangeText={setEmail} />
      </View>
      <View>
        <Text>Password:</Text>
        <TextInput style={styles.input} onChangeText={setPassword} />
      </View>
      <View>
        <Text>Password (repeat):</Text>
        <TextInput style={styles.input} onChangeText={setPasswordRepeat} />
      </View>
      <View style={styles.rowFormItem}>
        <View>
          <Text>First Name:</Text>
          <TextInput style={styles.input} onChangeText={setFirstName} />
        </View>
        <View>
          <Text>Last Name:</Text>
          <TextInput style={styles.input} onChangeText={setLastName} />
        </View>
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    rowGap: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
  },
  rowFormItem: {
    flexDirection: "row",
    columnGap: 10,
  },
});
