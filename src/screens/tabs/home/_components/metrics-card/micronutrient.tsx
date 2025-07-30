// core dependencies
import React from "react";
import { Pressable } from "react-native";
import { Apple, PlusCircle } from "lucide-react-native";

// core components
import { Card, Text, Icon, HStack, VStack } from "@/components/ui";

interface IMicronutrientProps {
  onPress: () => void;
  micronutrients: {
    name: string;
    shortName: string;
    value: number;
    target: number;
  }[];
}

export const Micronutrient = ({
  onPress,
  micronutrients,
}: IMicronutrientProps) => {
  const getColor = (percent: number) => {
    if (percent >= 60) return "text-emerald-400";
    if (percent <= 20) return "text-red-500";
    return "text-background-600";
  };

  return (
    <Card className="gap-4 flex-1">
      <HStack className="items-center gap-2">
        <Icon as={Apple} className="text-indigo-400" />
        <Text className="flex-1 text-sm">Micronutrients</Text>
        <Pressable onPress={onPress}>
          <Icon as={PlusCircle} size="sm" />
        </Pressable>
      </HStack>

      <HStack className="items-center justify-between">
        {micronutrients.map((nutrient) => {
          const percentage = (nutrient.value / nutrient.target) * 100;
          return (
            <VStack key={nutrient.name} className="items-center gap-1">
              <Text size="2xs" className={`font-bold ${getColor(percentage)}`}>
                {percentage.toFixed(0)}%
              </Text>
              <Text className="text-xs text-background-400">
                {nutrient.shortName}
              </Text>
            </VStack>
          );
        })}
      </HStack>
    </Card>
  );
};
