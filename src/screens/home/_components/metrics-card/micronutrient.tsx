import React from "react";
import { Apple, Info } from "lucide-react-native";
import { Card, Text, Icon, HStack, VStack } from "@/components/ui";
import { useNutrientStore } from "@/store/useNutrientsStore";

export const Micronutrient = () => {
  const { micronutrients } = useNutrientStore();

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
        <Icon as={Info} size="sm" />
      </HStack>

      <HStack className="items-center justify-between">
        {micronutrients.map((nutrient, index) => (
          <VStack key={index} className="items-center gap-1">
            <Text
              className={`text-[11px] font-bold ${getColor(nutrient.value)}`}
            >
              {nutrient.value}%
            </Text>
            <Text className="text-xs text-background-400">
              {nutrient.shortName}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Card>
  );
};
