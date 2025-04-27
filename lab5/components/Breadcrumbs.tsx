import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

interface BreadcrumbsProps {
  path: string;
  onClick: (path: string) => void;
}

interface Breadcrumb {
  label: string;
  path: string;
}

export const Breadcrumbs = ({ path, onClick }: BreadcrumbsProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  const createBreadcrumbs = (path: string) => {
    const pathParts = path.split("/").filter((part) => part !== "");
    const breadcrumbs = pathParts.map((part, index) => {
      return {
        label: part,
        path: pathParts.slice(0, index + 1).join("/"),
      };
    });
    setBreadcrumbs(breadcrumbs);
  };

  useEffect(() => {
    createBreadcrumbs(path);
  }, [path]);

  console.log("Breadcrumbs:", breadcrumbs);

  return (
    <View style={styles.container}>
      {breadcrumbs.map(({ label, path }, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Pressable
            key={index}
            onPress={() => onClick(path)}
            style={styles.breadcrumb}
          >
            <Text>{label}</Text>
          </Pressable>
          {index < breadcrumbs.length - 1 && (
            <AntDesign
              name="right"
              size={16}
              color="black"
              style={styles.separator}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  breadcrumb: {
    marginRight: 5,
  },
  separator: {
    marginHorizontal: 5,
  },
});
