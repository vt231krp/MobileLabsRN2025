import { NotifyContext } from "@/contexts/NotifyContext";
import { useContext } from "react";

export const useNotifyContext = () => {
  const context = useContext(NotifyContext);

  if (!context) {
    throw new Error("useNotifyContext must be used within a NotifyProvider");
  }
  return context;
};
