import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalProvider } from "@/contexts/ModalContext";
import { ModalView } from "@/components";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <ModalProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <ModalView />
        </ModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
