// core dependencies
import { Utensils } from "lucide-react-native";
import React from "react";

// core components
import { Card, HStack, Icon, Text, VStack } from "@/components/ui";

// constants
import { dMacroTargets } from "@/constants/analysis";

// handler functions
import { useProfileStore } from "@/store/useOnboardingStore";
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";

// component logic
export const MacroDistribution = () => {
  const { profile } = useProfileStore();
  const { nutrientAnalysis } = useNutrientAnalysisStore();

  const proteinTarget =
    profile.targetMacroNutrient?.protein || dMacroTargets.protein;
  const carbsTarget = profile.targetMacroNutrient?.carbs || dMacroTargets.carbs;
  const fatTarget = profile.targetMacroNutrient?.fat || dMacroTargets.fat;

  const proteinConsumed = nutrientAnalysis.protein;
  const carbsConsumed = nutrientAnalysis.carbs;
  const fatConsumed = nutrientAnalysis.fat;

  const percentageProteinConsumed = (proteinConsumed / proteinTarget) * 100;
  const percentageCarbsConsumed = (carbsConsumed / carbsTarget) * 100;
  const percentageFatConsumed = (fatConsumed / fatTarget) * 100;

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
            {percentageFatConsumed.toFixed(2)}%
          </Text>
          <Text className="text-xs text-gray-400">Fat</Text>
        </VStack>
      </HStack>
    </Card>
  );
};
