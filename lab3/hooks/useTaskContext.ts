import { useContext } from "react";
import { TaskContext } from "@/contexts/TaskContext";

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }

  return context;
};
