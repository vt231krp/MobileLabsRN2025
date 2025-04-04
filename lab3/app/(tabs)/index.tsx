import { usePointContext } from "@/hooks/usePointContext";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import {
  GestureDetector,
  Gesture,
  Pressable,
  Directions,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { useTaskContext } from "@/hooks/useTaskContext";
import { Task } from "../../types";

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get("screen");

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function HomeScreen() {
  const { score, incPoints } = usePointContext();
  const { tasks, setTaskCompleted } = useTaskContext();
  const [clickCount, setClickCount] = useState<number>(0);
  const [doubleClickCount, setDoubleClickCount] = useState<number>(0);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  useIsomorphicLayoutEffect(() => {
    if (
      score >= 100 &&
      tasks.find((task: Task) => task.id === "collect")?.isCompleted === false
    ) {
      setTaskCompleted("collect");
    }
  }, [incPoints, score, setTaskCompleted, tasks]);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    incPoints(1);

    if (
      clickCount >= 9 &&
      tasks.find((task) => task.id === "click")?.isCompleted === false
    ) {
      setTaskCompleted("click");
    }
  };

  const doubleClick = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      setDoubleClickCount((prev) => prev + 1);
      incPoints(5);

      if (
        doubleClickCount >= 4 &&
        tasks.find((task: Task) => task.id === "doubleClick")?.isCompleted ===
          false
      ) {
        setTaskCompleted("doubleClick");
      }
    });

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onStart(() => {
      incPoints(10);

      if (
        tasks.find((task: Task) => task.id === "longPress")?.isCompleted ===
        false
      ) {
        setTaskCompleted("longPress");
      }
    });

  const drag = Gesture.Pan()
    .minDistance(50)
    .onStart(() => {
      console.log("Drag started");

      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;

      incPoints(10);

      if (
        tasks.find((task: Task) => task.id === "drag")?.isCompleted === false
      ) {
        setTaskCompleted("drag");
      }
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - 125;
      const maxTranslateY = height / 2 - 125;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    })
    .runOnJS(true);

  const leftSwipe = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      console.log("Left swipe detected");
      incPoints(10);

      if (
        tasks.find((task: Task) => task.id === "leftSwipe")?.isCompleted ===
        false
      ) {
        setTaskCompleted("leftSwipe");
      }
    });

  const rightSwipe = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      console.log("Right swipe detected");
      incPoints(10);

      if (
        tasks.find((task: Task) => task.id === "rightSwipe")?.isCompleted ===
        false
      ) {
        setTaskCompleted("rightSwipe");
      }
    });

  const resize = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd((e) => {
      console.log("Pinch ended, final scale:", e.scale);
      if (e.scale !== 1) {
        console.log("Block was resized!");

        incPoints(15);

        if (
          tasks.find((task: Task) => task.id === "resize")?.isCompleted ===
          false
        ) {
          setTaskCompleted("resize");
        }
      }
      savedScale.value = scale.value;
    })
    .runOnJS(true);

  const composed = Gesture.Race(
    longPress,
    doubleClick,
    drag,
    resize,
    leftSwipe,
    rightSwipe
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translationX.value },
        { translateY: translationY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{score} points</Text>
      </View>
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.block, animatedStyle]}>
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
    width: 250,
    height: 250,
  },
});
