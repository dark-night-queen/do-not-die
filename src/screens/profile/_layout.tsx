import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Box, VStack } from "@/components/ui";

export default ({ children }: React.PropsWithChildren) => {
  return (
    <SafeAreaView>
      <Box variant="scroll">
        <ScrollView>
          <VStack className="gap-8 p-4 pt-8">{children}</VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
