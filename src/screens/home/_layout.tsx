import { Box, VStack } from "@/components/ui";
import React from "react";
import { SafeAreaView, ScrollView, useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

type LayoutProps = {
  className?: string;
  isScrollable?: boolean;
} & React.PropsWithChildren;

export default ({ children, className, isScrollable = false }: LayoutProps) => {
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const isDark = colorScheme === "dark";

  const boxVariant = isScrollable ? "scroll" : "screen";

  const Wrapper = () => (
    <Box variant={boxVariant}>
      <VStack className={`p-4 gap-8 ${className}`}>{children}</VStack>
    </Box>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDark ? colors.gray["900"] : colors.transparent,
      }}
      className="flex-1"
    >
      {isScrollable ? (
        <ScrollView>
          <Wrapper />
        </ScrollView>
      ) : (
        <Wrapper />
      )}
    </SafeAreaView>
  );
};
