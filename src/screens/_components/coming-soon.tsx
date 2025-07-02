// core dependencies
import React from "react";
import { Heart } from "lucide-react-native";

// core components
import { Card, HStack, Text, VStack } from "@/components/ui";
import { IconContainer } from "@/components/custom";

interface IComingSoon {
  heading: string;
}

// component logic
export const ComingSoon = ({ heading }: IComingSoon) => {
  return (
    <>
      <IconContainer
        as={Heart}
        className="p-4 rounded-2xl self-center dark:bg-gray-800"
        iconClassName="h-12 w-12"
      />
      <VStack className="items-center gap-3">
        <Text className="text-2xl font-medium">{heading} Coming Soon</Text>
        <Text className="text-sm text-center text-gray-500 dark:text-gray-400">
          We&apos;re working on bringing you comprehensive health tracking
          features. Monitor your vitals, track your progress, and get
          personalized insights to improve your overall well-being.
        </Text>
      </VStack>

      <HStack className="gap-4 mt-4">
        <Card className="flex-1 gap-2 items-center">
          <IconContainer
            as={Heart}
            className="p-4 rounded-2xl self-center bg-indigo-500/10"
          />
          <Text className="text-sm font-medium">Vital Tracking</Text>
          <Text className="text-xs text-gray-400 text-center">
            Monitor your heart rate, blood pressure, and other key health
            metrics
          </Text>
        </Card>

        <Card className="flex-1 gap-2 items-center">
          <IconContainer
            as={Heart}
            className="p-4 rounded-2xl self-center bg-green-500/10"
            iconClassName="text-green-400"
          />
          <Text className="text-sm font-medium">Health Insights</Text>
          <Text className="text-xs text-gray-400 text-center">
            Get personalized recommendations based on your health data
          </Text>
        </Card>
      </HStack>
    </>
  );
};
