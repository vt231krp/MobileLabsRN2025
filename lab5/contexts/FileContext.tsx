import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { Alert } from "react-native";

interface IFileContext {
  path: string | null;
  setPath: (path: string) => void;
  content: FileSystem.FileInfo[] | null;
  setContent: (content: FileSystem.FileInfo[] | null) => void;
  getInfo: (path: string) => Promise<FileSystem.FileInfo | undefined>;
  readDir: (path: string) => Promise<void>;
  makeDir: (name: string) => Promise<void>;
  handleCreateFile: (name: string) => Promise<void>;
  handleCreateDir: (name: string) => Promise<void>;
  handleCreateItem: (name: string, isDirectory: boolean) => Promise<void>;
  handleDelete: (uri: string, fileName: string) => void;
}

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};

export const FileContext = createContext<IFileContext | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [path, setPath] = useState<string | null>("AppData");
  const [content, setContent] = useState<FileSystem.FileInfo[] | null>(null);

  const getInfo = useCallback(async (path: string) => {
    try {
      const dir = `${FileSystem.documentDirectory}${path}`;
      const directoryInfo = await FileSystem.getInfoAsync(dir, {
        size: true,
      });
      return directoryInfo;
    } catch (err) {
      console.error("Error getting directory info:", err);
      Alert.alert("Error", "Error getting directory info", [{ text: "OK" }]);
    }
  }, []);

  const readDir = useCallback(async (path: string) => {
    try {
      const dir = `${FileSystem.documentDirectory}${path}`;
      const dirInfo = await FileSystem.readDirectoryAsync(dir);

      if (dirInfo.length > 0) {
        const fileInfo = await Promise.all(
          dirInfo.map(async (item) => {
            const itemInfo = await FileSystem.getInfoAsync(`${dir}/${item}`);
            return itemInfo;
          })
        );
        setContent(fileInfo);
      } else {
        setContent([]);
      }
    } catch (err) {
      console.error("Error reading directory:", err);
      Alert.alert("Error", "Error reading directory", [{ text: "OK" }]);
    }
  }, []);

  const makeDir = useCallback(async (name: string) => {
    try {
      const dir = `${FileSystem.documentDirectory}${name}`;
      const dirInfo = await FileSystem.getInfoAsync(dir, { size: true });
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        console.log("Directory created:", dir);
        Alert.alert("Success", "Directory already created", [{ text: "OK" }]);
      } else {
        console.log("Directory already exists:", dir);
        Alert.alert("Error", "Directory already exists", [{ text: "OK" }]);
      }
    } catch (err) {
      console.error("Error creating directory:", err);
      Alert.alert("Error", "Error creating directory", [{ text: "OK" }]);
    }
  }, []);

  const handleCreateFile = useCallback(
    async (name: string) => {
      try {
        const file = `${FileSystem.documentDirectory}${path}/${name}`;
        const fileInfo = await FileSystem.getInfoAsync(file, { size: true });
        if (!fileInfo.exists) {
          await FileSystem.writeAsStringAsync(file, "Hello World", {
            encoding: FileSystem.EncodingType.UTF8,
          });
          console.log("File created:", file);
          Alert.alert("Success", "File created", [{ text: "OK" }]);

          await readDir(path || "");
        } else {
          console.log("File already exists:", file);
          Alert.alert("Error", "File already exists", [{ text: "OK" }]);
        }
      } catch (err) {
        console.error("Error creating file:", err);
        Alert.alert("Error", "Error creating file", [{ text: "OK" }]);
      }
    },
    [path, readDir]
  );

  const handleCreateDir = useCallback(
    async (name: string) => {
      try {
        const dir = `${FileSystem.documentDirectory}${path}/${name}`;
        const dirInfo = await FileSystem.getInfoAsync(dir, { size: true });
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
          console.log("Directory created:", dir);
          Alert.alert("Success", "Directory created", [{ text: "OK" }]);

          await readDir(path || "");
        } else {
          console.log("Directory already exists:", dir);
          Alert.alert("Error", "Directory already exists", [{ text: "OK" }]);
        }
      } catch (err) {
        console.error("Error creating directory:", err);
        Alert.alert("Error", "Error creating directory", [{ text: "OK" }]);
      }
    },
    [path, readDir]
  );

  const handleCreateItem = useCallback(
    async (name: string, isDirectory: boolean) => {
      if (isDirectory) {
        await handleCreateDir(name);
      } else {
        await handleCreateFile(name);
      }
    },
    [handleCreateDir, handleCreateFile]
  );

  const handleDelete = (uri: string, fileName: string) => {
    Alert.alert("Delete File", `Are you sure you want to delete ${fileName}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(uri, { idempotent: true });
            Alert.alert("Success", `${fileName} deleted successfully.`);
            await readDir(path || "");
          } catch (error) {
            console.error("Error deleting file:", error);
            Alert.alert("Error", `Failed to delete ${fileName}.`);
          }
        },
      },
    ]);
  };

  return (
    <FileContext.Provider
      value={{
        path,
        setPath,
        content,
        setContent,
        getInfo,
        readDir,
        makeDir,
        handleCreateFile,
        handleCreateDir,
        handleCreateItem,
        handleDelete,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
