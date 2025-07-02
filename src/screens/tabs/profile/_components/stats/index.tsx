// core dependencies
import React from "react";
import { Flame, Scale, Target } from "lucide-react-native";

// core components
import { HStack, VStack } from "@/components/ui";

// custom components
import { CustomCard } from "./stats-card";

// helper functions
import { getWeightUnitSystem } from "@/utils/units";
import { Profile } from "@/constants/user";

interface IStatsType {
  profile: Profile;
}

// component logic
export const Stats = ({ profile }: IStatsType) => {
  const weightUnitSystem = getWeightUnitSystem(profile?.unitSystem ?? "METRIC");

  return (
    <VStack className="gap-4">
      <HStack className="gap-4">
        <CustomCard
          icon={Scale}
          className="text-blue-400"
          value={`${profile?.displayWeight} ${weightUnitSystem}`}
          name="Current Weight"
        />
        <CustomCard
          icon={Target}
          className="text-green-400"
          value={`${profile?.displayTargetWeight} ${weightUnitSystem}`}
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
