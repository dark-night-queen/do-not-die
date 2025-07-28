// core dependencies
import React from "react";
import { Activity } from "lucide-react-native";

// core components
import { Card, Text, Icon, HStack, VStack } from "@/components/ui";
import { Progress, ProgressGradientTrack } from "@/components/ui/progress";

// custom components
import { InfoPopover } from "@/screens/_components";

// constants
import { InfoText } from "@/constants/info/home";

// handler functions
import { getNutritionScoreDescription } from "@/utils/analysis/nutrition-score";

interface IHealthScoreProps {
  showIcon?: boolean;
  showHealthScore?: boolean;
  healthScore: number;
  info: InfoText;
}

// component logic
export const HealthScore = ({
  showIcon = true,
  showHealthScore = false,
  healthScore,
  info,
}: IHealthScoreProps) => {
  const healthScoreInfo = getNutritionScoreDescription(healthScore);

  return (
    <Card className="gap-4 flex-1">
      <VStack>
        <HStack className="items-center gap-2">
          {showIcon ? <Icon as={Activity} className="text-indigo-400" /> : null}
          <Text className="flex-1 text-sm text-gray-400">Health Score</Text>
          <InfoPopover size="sm" {...info} />
        </HStack>

        {showHealthScore ? (
          <Text className={`font-bold ${healthScoreInfo.color}`}>
            {healthScore} / 10
          </Text>
        ) : null}
      </VStack>
      <VStack className="gap-2">
        <Progress size="sm" value={healthScore * 10}>
          <ProgressGradientTrack colors={["#ef4444", "#eab308", "#22c55e"]} />
        </Progress>

        <HStack className="justify-between">
          <Text size="xs" className="text-background-400">
            Poor
          </Text>
          <Text size="xs" className={healthScoreInfo.color}>
            {healthScoreInfo.label}
          </Text>
          <Text size="xs" className="text-background-400">
            Excellent
          </Text>
        </HStack>
      </VStack>
    </Card>
  );
};
