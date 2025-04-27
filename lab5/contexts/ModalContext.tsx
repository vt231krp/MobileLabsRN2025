import { AntDesign } from "@expo/vector-icons";
import { createContext, ReactNode, useContext, useState } from "react";
import { Modal, View, TouchableHighlight, StyleSheet } from "react-native";

interface IModalContext {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  content: any | null;
  setContent: (content: any | null) => void;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<any | null>(null);

  console.log("Modal content:", content);

  return (
    <ModalContext.Provider
      value={{
        isVisible,
        setIsVisible,
        content,
        setContent,
      }}
    >
      {children}
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => setIsVisible(false)}
              underlayColor="#c2c2c2"
            >
              <AntDesign name="closesquareo" size={24} color="black" />
            </TouchableHighlight>
            {content}
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
