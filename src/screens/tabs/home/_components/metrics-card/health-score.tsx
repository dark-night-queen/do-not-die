// core dependencies
import React from "react";
import { Activity, Info } from "lucide-react-native";

// core components
import { Card, Text, Icon, HStack, VStack } from "@/components/ui";
import { Progress, ProgressGradientTrack } from "@/components/ui/progress";

// handler functions
// import { useNutrientStore } from "@/store/useNutrientsStore";

export const HealthScore = () => {
  // const { healthScore } = useNutrientStore();
  const healthScore = 0;

  return (
    <Card className="flex-1 gap-4">
      <HStack className="items-center gap-3">
        <Icon as={Activity} className="text-indigo-400" />
        <Text className="flex-1 text-sm">Health Score</Text>
        <Icon as={Info} size="sm" />
      </HStack>

      <VStack className="gap-2">
        <Progress value={healthScore}>
          <ProgressGradientTrack colors={["#ef4444", "#eab308", "#22c55e"]} />
        </Progress>

        <HStack className="justify-between">
          <Text className="text-xs text-background-400">Poor</Text>
          <Text className="text-xs text-background-400">Excellent</Text>
        </HStack>
      </VStack>
    </Card>
  );
};
