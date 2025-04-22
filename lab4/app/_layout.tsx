import { Stack } from "expo-router";
import { useEffect } from "react";
import { OneSignal, LogLevel } from "react-native-onesignal";
import Constants from "expo-constants";
import { NotifyProvider } from "@/contexts/NotifyContext";

export default function RootLayout() {
  const oneSignalAppId = Constants.expoConfig?.extra?.oneSignalAppId;

  useEffect(() => {
    console.log("OneSignal App ID:", oneSignalAppId);
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(oneSignalAppId);
    OneSignal.Notifications.requestPermission(true);
  }, [oneSignalAppId]);

  return (
    <NotifyProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </NotifyProvider>
  );
}
