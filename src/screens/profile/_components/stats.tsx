import React from "react";
import { Flame, Scale, Target } from "lucide-react-native";
import { HStack, Text, Card, Icon, VStack } from "@/components/ui";
import { useGoalStore, useProfileStore } from "@/store/useOnboardingStore";
import { getWeightUnitSystem } from "@/utils/units";

type ICustomCard = {
  icon: any;
  className: string;
  name: string;
  value: string;
};

const CustomCard = ({ icon, className, name, value }: ICustomCard) => {
  return (
    <Card className="flex-1 gap-y-1 rounded-xl">
      <HStack className="items-center gap-2">
        <Icon as={icon} className={className} />
        <Text className="text-xs text-gray-400">{name}</Text>
      </HStack>
      <Text className="text-lg font-semibold">{value}</Text>
    </Card>
  );
};

export const Stats = () => {
  const { profile } = useProfileStore();
  const { goal } = useGoalStore();
  const weightUnitSystem = getWeightUnitSystem(profile?.unitSystem ?? "METRIC");

  return (
    <VStack className="gap-4">
      <HStack className="gap-4">
        <CustomCard
          icon={Scale}
          className="text-blue-400"
          value={`${profile?.weight} ${weightUnitSystem}`}
          name="Current Weight"
        />
        <CustomCard
          icon={Target}
          className="text-green-400"
          value={`${goal?.targetWeight} ${weightUnitSystem}`}
          name="Target Weight"
        />
      </HStack>

      <HStack className="gap-4">
        <CustomCard
          icon={Flame}
          className="text-orange-400"
          value={`${profile?.dailyCalorieTarget} kcal`}
          name="Daily Calorie Target"
        />
      </HStack>
    </VStack>
  );
};
