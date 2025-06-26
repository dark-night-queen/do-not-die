import React from "react";
import { Flame } from "lucide-react-native";
import { Card, HStack, Text, VStack } from "@/components/ui";
import {
  CardRadioElement,
  FormElement,
  IconContainer,
} from "@/components/custom";
import {
  ActivityLevel,
  ActivityLevelOptions,
} from "@/constants/user.activity.type";

interface IUserActivityLevel {
  formData: {
    activityLevel: ActivityLevel;
  };
  handleChange: (name: string) => (value: string) => void;
}

// TODO: complete calorie calculator
export const UserActivityLevel = ({
  formData,
  handleChange,
}: IUserActivityLevel) => {
  const [showCalorieCalculation, setShowCalorieCalculation] =
    React.useState(false);

  return (
    <>
      <VStack className="items-center gap-1">
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

      {showCalorieCalculation ? (
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
              <Text className="text-base font-medium text-white">100 kCal</Text>
            </HStack>

            <HStack className="items-center">
              <Text className="text-sm text-gray-400 flex-1">
                Weekly Weight Change:
              </Text>
              <Text className="text-base font-medium text-white">
                100 kg loss
              </Text>
            </HStack>
          </VStack>
        </Card>
      ) : null}
    </>
  );
};
