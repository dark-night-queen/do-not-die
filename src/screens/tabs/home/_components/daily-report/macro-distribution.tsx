// core dependencies
import React from "react";
import { Utensils } from "lucide-react-native";

// core components
import { HStack, Card, Icon, Text, VStack } from "@/components/ui";

// handler functions
import { useProfileStore } from "@/store/useOnboardingStore";
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";

// component logic
export const MacroDistribution = () => {
  const { profile } = useProfileStore();
  const { nutrientAnalysis } = useNutrientAnalysisStore();

  const proteinTarget = profile.targetMacroNutrient?.proteinTarget || 0;
  const carbsTarget = profile.targetMacroNutrient?.carbsTarget || 0;
  const fatTarget = profile.targetMacroNutrient?.fatTarget || 0;

  const proteinConsumed = nutrientAnalysis.protein;
  const carbsConsumed = nutrientAnalysis.carbs;
  const fatsConsumed = nutrientAnalysis.fats;

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
