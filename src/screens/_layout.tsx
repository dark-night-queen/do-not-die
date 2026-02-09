// core dependencies
import React from "react";
import { View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// core components
import { VStack } from "@/components/ui/vstack";

interface IDefaultLayout extends React.PropsWithChildren {
  className?: string;
}

const DefaultLayout = ({ className = "", children }: IDefaultLayout) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const isDark = colorScheme === "dark";

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className={isDark ? "bg-gray-900" : "bg-white"}
    >
      <VStack className={`flex-1 gap-4 ${className}`}>{children}</VStack>
    </View>
  );
};

export default DefaultLayout;
