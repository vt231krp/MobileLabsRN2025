import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { ModalView } from "./ModalView";

interface CreateItemFormProps {
  onCreate: (name: string, isDirectory: boolean) => void;
}

export const CreateItemForm = ({ onCreate }: CreateItemFormProps) => {
  const [isDirectory, setIsDirectory] = useState<boolean | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState<string>("");

  const closeModal = () => {
    setModalVisible(false);
    setItemName("");
    setIsDirectory(null);
  };

  return (
    <View>
      <TouchableHighlight
        underlayColor="#c2c2c2"
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plussquareo" size={24} color="black" />
      </TouchableHighlight>
      <ModalView modalVisible={modalVisible} onClose={closeModal}>
        <View style={styles.form}>
          {isDirectory == null ? (
            <>
              <Text>Choose item type:</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Button
                  title="File"
                  onPress={() => {
                    setIsDirectory(false);
                  }}
                />
                <Button
                  title="Directory"
                  onPress={() => {
                    setIsDirectory(true);
                  }}
                />
              </View>
            </>
          ) : (
            <>
              <Text>Enter {isDirectory ? "directory" : "file"} name:</Text>

              <TextInput
                style={styles.input}
                placeholder={`${isDirectory ? "Directory" : "File"} name`}
                value={itemName}
                onChangeText={setItemName}
              />

              <Button
                title="Create"
                onPress={() => {
                  onCreate(itemName, isDirectory);
                  closeModal();
                }}
              />
            </>
          )}
        </View>
      </ModalView>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
    gap: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
  },
});
