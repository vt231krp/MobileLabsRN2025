import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";
import { useTheme } from "styled-components/native";

import StoreScreen from "./index";
import CommunityScreen from "./community";
import ChatScreen from "./chat";
import SafetyScreen from "./safety";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.primary,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 10,
        },
        tabBarActiveTintColor: theme.tabBarActive,
        tabBarInactiveTintColor: theme.tabBarInactive,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Safety"
        component={SafetyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="shield" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/images/Profile.png")}
              style={{ width: size, height: size, borderRadius: 50 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
