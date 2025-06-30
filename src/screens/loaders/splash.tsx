import React from "react";
import Layout from "../home/_layout";
import { SafeAreaView } from "react-native";
import { Heart } from "lucide-react-native";
import { Box, Text, VStack } from "@/components/ui";
import { IconContainer } from "@/components/custom";

export default () => {
  return (
    <Layout>
      <IconContainer
        as={Heart}
        className="p-4 rounded-2xl self-center dark:bg-gray-800"
        iconClassName="h-12 w-12"
      />

      <Text className="text-2xl font-medium">Do not die</Text>
    </Layout>
  );
};
