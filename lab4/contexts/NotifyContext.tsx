import { INotification } from "@/types";
import { createContext, ReactNode, useEffect, useState, useRef } from "react";
import * as SecureStore from "expo-secure-store";

interface INotifyContext {
  notifications: INotification[];
  addNotification: (notification: INotification) => void;
  removeNotification: (id: string) => void;
  fetchNotifications: () => void;
}

interface NotifyProviderProps {
  children: ReactNode;
}

export const NotifyContext = createContext<INotifyContext | undefined>(
  undefined
);

export const NotifyProvider = ({ children }: NotifyProviderProps) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const timeoutsRef = useRef<number[]>([]);

  const fetchNotifications = async (): Promise<void> => {
    const data = await SecureStore.getItemAsync("notifications");
    if (!data) return;

    const parsedData = JSON.parse(data) as INotification[];
    const upcoming = parsedData.filter(
      (n) => new Date(n.date).getTime() > Date.now()
    );
    await SecureStore.setItemAsync("notifications", JSON.stringify(upcoming));
    setNotifications(upcoming);
  };

  const addNotification = async (notification: INotification) => {
    const updated = [...notifications, notification];
    setNotifications(updated);
    await SecureStore.setItemAsync("notifications", JSON.stringify(updated));
  };

  const removeNotification = async (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    await SecureStore.setItemAsync("notifications", JSON.stringify(updated));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    notifications.forEach((n) => {
      const delay = new Date(n.date).getTime() - Date.now();
      if (delay > 0) {
        const id = setTimeout(() => {
          void removeNotification(n.id);
        }, delay);
        timeoutsRef.current.push(id as unknown as number);
      } else {
        void removeNotification(n.id);
      }
    });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [notifications]);

  return (
    <NotifyContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        fetchNotifications,
      }}
    >
      {children}
    </NotifyContext.Provider>
  );
};
