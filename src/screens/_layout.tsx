// core dependencies
import React from "react";
import { SafeAreaView, useColorScheme } from "react-native";

// core components
import { VStack } from "@/components/ui";

// constants
import colors from "tailwindcss/colors";

interface IDefaultLayout extends React.PropsWithChildren {
  className?: string;
}

const DefaultLayout = ({ className = "", children }: IDefaultLayout) => {
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.gray["900"] : colors.transparent,
      }}
    >
      <VStack className={`flex-1 p-6 gap-4 ${className}`}>{children}</VStack>
    </SafeAreaView>
  );
};

export default DefaultLayout;
