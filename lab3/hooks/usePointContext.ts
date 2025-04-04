import { PointContext } from "@/contexts/PointContext";
import { useContext } from "react";

export const usePointContext = () => {
  const context = useContext(PointContext);
  if (!context) {
    throw new Error("usePointContext must be used within a PointProvider");
  }

  return context;
};
