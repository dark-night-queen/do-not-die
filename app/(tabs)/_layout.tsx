import React from "react";
import { Tabs } from "expo-router";
import colors from "tailwindcss/colors";
import { useColorScheme } from "react-native";
import { BarChart2, Home, User } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.indigo["500"],
        tabBarStyle: {
          backgroundColor: isDark ? colors.gray["900"] : colors.transparent,
          borderTopWidth: 2,
          elevation: 0,
          paddingTop: 8,
          borderTopColor: isDark ? colors.gray["800"] : colors.gray["200"],
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => <BarChart2 size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
