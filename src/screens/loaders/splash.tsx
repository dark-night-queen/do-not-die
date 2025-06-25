import React from "react";
import { SafeAreaView } from "react-native";
import { Heart } from "lucide-react-native";
import { Box, Text, VStack } from "@/components/ui";
import { IconContainer } from "@/components/ui/icon/icon-container";

export default () => {
  return (
    <SafeAreaView>
      <Box variant="screen">
        <VStack className="w-full max-w-sm p-4 gap-8">
          <IconContainer
            as={Heart}
            className="p-4 rounded-2xl self-center dark:bg-gray-800"
            iconClassName="h-12 w-12"
          />
        </VStack>

        <VStack className="items-center gap-3">
          <Text className="text-2xl font-medium">Do not die</Text>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};
