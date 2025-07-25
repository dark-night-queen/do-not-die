// core dependencies
import React from "react";
import { Utensils } from "lucide-react-native";

// core components
import { HStack, Card, Icon, Text, VStack } from "@/components/ui";

// handler functions
import { useProfileStore } from "@/store/useOnboardingStore";
// import { useNutrientStore } from "@/store/useNutrientsStore";
// import { useDailyDataStore } from "@/store/useDailyDataStore";

// component logic
// TODO: update consumed values from the store
export const MacroDistribution = () => {
  const { profile } = useProfileStore();

  const {
    proteinTarget = 0,
    carbsTarget = 0,
    fatTarget = 0,
  } = profile.targetMacroNutrient || {};

  const proteinConsumed = 0;
  const carbsConsumed = 0;
  const fatsConsumed = 0;

  // const { proteinConsumed, carbsConsumed, fatsConsumed } = useNutrientStore();

  const percentageProteinConsumed = (proteinConsumed / proteinTarget) * 100;
  const percentageCarbsConsumed = (carbsConsumed / carbsTarget) * 100;
  const percentageFatsConsumed = (fatsConsumed / fatTarget) * 100;

  return (
    <Card className="gap-4">
      <HStack className="items-center">
        <Text className="flex-1">Macro Distribution</Text>
        <Icon as={Utensils} className="text-gray-400" />
      </HStack>

      <HStack className="justify-around">
        <VStack className="items-center">
          <Text className="text-base font-bold tabular-nums text-rose-400">
            {percentageProteinConsumed.toFixed(2)}%
          </Text>
          <Text className="text-xs text-gray-400">Protein</Text>
        </VStack>

        <VStack className="items-center">
          <Text className="text-base font-bold tabular-nums text-amber-400">
            {percentageCarbsConsumed.toFixed(2)}%
          </Text>
          <Text className="text-xs text-gray-400">Carbs</Text>
        </VStack>

        <VStack className="items-center">
          <Text className="text-base font-bold tabular-nums text-blue-400">
            {percentageFatsConsumed.toFixed(2)}%
          </Text>
          <Text className="text-xs text-gray-400">Fat</Text>
        </VStack>
      </HStack>
    </Card>
  );
};
