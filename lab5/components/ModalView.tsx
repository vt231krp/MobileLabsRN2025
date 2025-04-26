import AntDesign from "@expo/vector-icons/AntDesign";
import { Children, ReactNode } from "react";
import { View, Modal, StyleSheet, TouchableHighlight } from "react-native";

interface ModalViewProps {
  modalVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ModalView = ({
  modalVisible,
  onClose,
  children,
}: ModalViewProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableHighlight
            style={styles.closeButton}
            onPress={onClose}
            underlayColor="#c2c2c2"
          >
            <AntDesign name="closesquareo" size={24} color="black" />
          </TouchableHighlight>
          {children}
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
