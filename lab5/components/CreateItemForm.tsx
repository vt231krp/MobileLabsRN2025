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
import { useModalContext } from "@/contexts/ModalContext";

interface CreateItemFormProps {
  onCreate: (name: string, isDirectory: boolean) => void;
}

const CreateItemModal = ({ onCreate }: CreateItemFormProps) => {
  const [isDirectory, setIsDirectory] = useState<boolean | null>(null);
  const [itemName, setItemName] = useState<string>("");
  const { setIsVisible } = useModalContext();

  const handleCreate = () => {
    if (itemName && isDirectory !== null) {
      onCreate(itemName, isDirectory);
      setIsVisible(false);
    }
  };

  return (
    <View style={styles.form}>
      {isDirectory == null ? (
        <>
          <Text>Choose item type:</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button title="File" onPress={() => setIsDirectory(false)} />
            <Button title="Directory" onPress={() => setIsDirectory(true)} />
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
          <Button title="Create" onPress={handleCreate} />
        </>
      )}
    </View>
  );
};

export const CreateItemForm = ({ onCreate }: CreateItemFormProps) => {
  const { setContent, setIsVisible } = useModalContext();

  const handleOpenModal = () => {
    setContent(<CreateItemModal onCreate={onCreate} />);
    setIsVisible(true);
  };

  return (
    <View>
      <TouchableHighlight underlayColor="#c2c2c2" onPress={handleOpenModal}>
        <AntDesign name="plussquareo" size={24} color="black" />
      </TouchableHighlight>
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
