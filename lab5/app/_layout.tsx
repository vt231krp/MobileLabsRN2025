import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalProvider } from "@/contexts/ModalContext";
import { FileProvider } from "@/contexts/FileContext";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FileProvider>
        <ModalProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ModalProvider>
      </FileProvider>
    </SafeAreaView>
  );
}
