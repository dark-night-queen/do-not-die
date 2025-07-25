// core dependencies
import React from "react";
import { Flame } from "lucide-react-native";

// core components
import { Card, HStack, Text, VStack } from "@/components/ui";

// custom components
import {
  CardRadioElement,
  FormElement,
  IconContainer,
} from "@/components/custom";

// handler functions
import { ActivityLevel, ActivityLevelOptions } from "@/constants/user";

interface IUserActivityLevel {
  formData: {
    activityLevel?: ActivityLevel;
  };
  meta: {
    dailyCalorieTarget: number;
    weeklyWeightChange: number;
  };
  handleChange: (name: string) => (value: string) => void;
}

// component logic
export const UserActivityLevel = ({
  formData,
  meta,
  handleChange,
}: IUserActivityLevel) => {
  return (
    <>
      <VStack className="items-center gap-1 mb-4">
        <Text className="text-2xl font-bold">Your Activity Level</Text>
        <Text className="text-sm text-center text-gray-400">
          Help us understand your lifestyle better
        </Text>
      </VStack>

      <FormElement>
        <CardRadioElement
          options={ActivityLevelOptions}
          value={formData.activityLevel}
          cardRadioProps={{ size: "lg" }}
          onChange={handleChange("activityLevel")}
          formatLabel={(opt) => (
            <HStack className="flex-row items-center gap-4">
              <IconContainer
                as={opt.icon}
                className="bg-gray-700"
                iconClassName="text-white"
              />
              <VStack>
                <Text className="text-lg font-medium">{opt.label}</Text>
                <Text className="text-sm dark:text-gray-300">
                  {opt.description}
                </Text>
              </VStack>
            </HStack>
          )}
        />
      </FormElement>

      {formData.activityLevel ? (
        <Card className="gap-6">
          <HStack className="items-center gap-4">
            <IconContainer
              as={Flame}
              className="bg-orange-500/10"
              iconClassName="text-orange-400"
            />
            <Text className="text-lg font-medium">Calorie Calculation</Text>
          </HStack>

          <VStack className="gap-2">
            <HStack className="items-center">
              <Text className="text-sm text-gray-400 flex-1">
                Daily Calorie Target:
              </Text>
              <Text className="text-base font-medium text-white">
                {meta.dailyCalorieTarget} kcal
              </Text>
            </HStack>

            <HStack className="items-center">
              <Text className="text-sm text-gray-400 flex-1">
                Weekly Weight Change:
              </Text>
              <Text className="text-base font-medium text-white">
                {Math.abs(meta.weeklyWeightChange)} kg
                {meta.weeklyWeightChange < 0 ? " loss" : " gain"}
              </Text>
            </HStack>
          </VStack>
        </Card>
      ) : null}
    </>
  );
};
