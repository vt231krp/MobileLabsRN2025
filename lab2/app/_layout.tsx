import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme } from "../theme/lightTheme";
import { darkTheme } from "../theme/darkTheme";

import { createContext } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  mode: "dark",
  setMode: () => {},
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemColorScheme = useColorScheme();

  const [mode, setMode] = useState<ThemeMode>(
    (systemColorScheme as ThemeMode) || "dark"
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadThemePreference() {
      try {
        const savedTheme = (await AsyncStorage.getItem(
          "@theme_mode"
        )) as ThemeMode;

        if (savedTheme) {
          setMode(savedTheme);
        }

        setIsLoaded(true);

        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Failed to load theme preference:", error);
        setIsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    loadThemePreference();
  }, []);

  const handleSetMode = async (newMode: ThemeMode) => {
    setMode(newMode);

    try {
      await AsyncStorage.setItem("@theme_mode", newMode);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode: handleSetMode }}>
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style={mode === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
