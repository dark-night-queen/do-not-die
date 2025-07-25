// core dependencies
import React from "react";
import { TrendingUp } from "lucide-react-native";

// core components
import {
  HStack,
  Card,
  Icon,
  Text,
  Progress,
  ProgressFilledTrack,
} from "@/components/ui";

// handler functions
import { useProfileStore } from "@/store/useOnboardingStore";
// import { useNutrientStore } from "@/store/useNutrientsStore";
// import { useDailyDataStore } from "@/store/useDailyDataStore";

// component logic
// TODO: add calories consumed from the store
export const CalorieConsumed = () => {
  const { profile } = useProfileStore();
  // const { caloriesConsumed } = useNutrientStore();

  const caloriesTarget = profile?.dailyCalorieTarget || 0;
  const caloriesConsumed = 0; // Placeholder for actual consumed calories
  const percentageConsumed = (caloriesConsumed / caloriesTarget) * 100;

  const getCalorieStatus = () => {
    if (percentageConsumed > 105) return "high";
    if (percentageConsumed > 95) return "warning";
    return "good";
  };
  const statusBg = {
    high: "bg-rose-400/10",
    warning: "bg-amber-400/10",
    good: "bg-emerald-400/10",
  };

  const progressBg = {
    high: "bg-rose-500",
    warning: "bg-amber-500",
    good: "bg-emerald-500",
  };

  const status = getCalorieStatus();

  return (
    <Card
      variant="outline"
      className={`${statusBg[status]} dark:${statusBg[status]} gap-4 border-0`}
    >
      <HStack className="items-center gap-3">
        <Icon as={TrendingUp} className="text-emerald-400" />
        <Text className="flex-1 text-gray-400">Calories Today</Text>

        <HStack className="items-baseline gap-1">
          <Text className="text-2xl font-bold tabular-nums">
            {caloriesConsumed}
          </Text>
          <Text className="text-xs tabular-nums text-gray-400">
            / {caloriesTarget}
          </Text>
        </HStack>
      </HStack>

      <Progress value={percentageConsumed}>
        <ProgressFilledTrack className={progressBg[status]} />
      </Progress>
    </Card>
  );
};
