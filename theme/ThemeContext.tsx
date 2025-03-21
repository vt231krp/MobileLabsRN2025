import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme } from "./darkTheme.ts";
import { lightTheme } from "./lightTheme.ts";

interface ThemeContextType {
  theme: typeof lightTheme & typeof darkTheme;
  isDarkMode: boolean;
  toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme !== null) {
          const parsedTheme = JSON.parse(savedTheme);
          setIsDarkMode(parsedTheme === "dark");
          setTheme(parsedTheme === "dark" ? darkTheme : lightTheme);
        }
      } catch (error) {
        console.log("Error loading theme preference", error);
      }
    };

    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    try {
      const newIsDarkMode = !isDarkMode;
      setIsDarkMode(newIsDarkMode);
      setTheme(newIsDarkMode ? darkTheme : lightTheme);
      await AsyncStorage.setItem(
        "theme",
        JSON.stringify(newIsDarkMode ? "dark" : "light")
      );
    } catch (error) {
      console.log("Error saving theme preference", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
