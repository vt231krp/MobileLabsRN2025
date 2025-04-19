import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.message}>
          The page you are looking for doesn't exist.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go back to Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
