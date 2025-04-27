import { createContext, ReactNode, useContext, useState } from "react";

interface IModalContext {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  content: JSX.Element | null;
  setContent: (content: JSX.Element | null) => void;
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
  const [content, setContent] = useState<JSX.Element | null>(null);

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
    </ModalContext.Provider>
  );
};
