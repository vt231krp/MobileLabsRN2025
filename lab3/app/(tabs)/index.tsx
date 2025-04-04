import { usePointContext } from "@/hooks/usePointContext";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import {
  GestureDetector,
  Gesture,
  Pressable,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import { useTaskContext } from "@/hooks/useTaskContext";

export default function HomeScreen() {
  const { score, incPoints } = usePointContext();
  const { setTaskCompleted } = useTaskContext();
  const [clickCount, setClickCount] = useState<number>(0);
  const [doubleClickCount, setDoubleClickCount] = useState<number>(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    incPoints(1);

    if (clickCount >= 9) {
      setTaskCompleted("click");
    }
  };

  const doubleClick = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      setDoubleClickCount((prev) => prev + 1);
      incPoints(5);

      if (doubleClickCount >= 4) {
        setTaskCompleted("doubleClick");
      }
    });

  const composed = Gesture.Race(doubleClick);

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{score} points</Text>
      </View>
      <GestureDetector gesture={composed}>
        <Animated.View style={styles.block}>
          <Pressable onPress={handleClick} style={{ flex: 1 }}></Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  pointsContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 15,
  },
  points: {
    fontSize: 20,
    fontWeight: "bold",
  },
  block: {
    backgroundColor: "#edd818",
    borderRadius: 20,
    width: "80%",
    height: 300,
  },
});
