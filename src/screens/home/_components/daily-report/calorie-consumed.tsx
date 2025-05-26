import React from 'react';
import { TrendingUp } from 'lucide-react-native';
import { HStack, Card, Icon, Text, Progress, ProgressFilledTrack } from '@/components/ui';
import { useNutrientStore } from '@/store/useNutrientsStore';

export const CalorieConsumed = () => {
  const { caloriesConsumed, targetCalories } = useNutrientStore();
  const percentageConsumed = (caloriesConsumed / targetCalories) * 100;

  const getCalorieStatus = () => {
    if (percentageConsumed > 105) return 'high';
    if (percentageConsumed > 95) return 'warning';
    return 'good';
  };
  const status = getCalorieStatus();
  const statusBg = {
    high: 'bg-rose-400/10',
    warning: 'bg-amber-400/10',
    good: 'bg-emerald-400/10',
  };

  const progressBg = {
    high: 'bg-rose-500',
    warning: 'bg-amber-500',
    good: 'bg-emerald-500',
  };

  return (
    <Card variant="outline" className={statusBg[status] + ` gap-4 border-0`}>
      <HStack className="items-center gap-3">
        <Icon as={TrendingUp} className="text-emerald-400" />
        <Text className="flex-1 text-gray-400">Calories Today</Text>

        <HStack className="items-baseline gap-1">
          <Text className="text-2xl font-bold tabular-nums">{caloriesConsumed}</Text>
          <Text className="text-xs tabular-nums text-gray-400">/ {targetCalories}</Text>
        </HStack>
      </HStack>

      <Progress value={40}>
        <ProgressFilledTrack className={progressBg[status]} />
      </Progress>
    </Card>
  );
};
