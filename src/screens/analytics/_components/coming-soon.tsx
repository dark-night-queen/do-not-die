import { Heart } from "lucide-react-native";
import { Text, VStack } from "@/components/ui";
import { IconContainer } from "@/components/custom";

export const ComingSoon = () => {
  return (
    <VStack className="w-full max-w-sm p-4 gap-8">
      <IconContainer
        as={Heart}
        className="p-4 rounded-2xl self-center dark:bg-gray-800"
        iconClassName="h-12 w-12"
      />

      <VStack className="items-center gap-3">
        <Text className="text-2xl font-medium">Analytics Coming Soon</Text>
        <Text className="text-center text-gray-500 dark:text-gray-400">
          We're working on bringing you comprehensive health tracking features.
          Monitor your vitals, track your progress, and get personalized
          insights to improve your overall well-being.
        </Text>
      </VStack>
    </VStack>
  );
};
