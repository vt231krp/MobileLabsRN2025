import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Modal, StyleSheet, TouchableHighlight } from "react-native";
import { useModalContext } from "@/contexts/ModalContext";

export const ModalView = () => {
  const { content, isVisible, setIsVisible } = useModalContext();

  return (
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
