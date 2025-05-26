import React from "react";
import { useRouter } from "expo-router";
import { Activity, Flame } from "lucide-react-native";
import {
  Button,
  ButtonText,
  Card,
  HStack,
  Text,
  VStack,
} from "@/components/ui";
import { FormElement } from "@/components/ui/form-control/form";
import { IconContainer } from "@/components/ui/icon/icon-container";

export const CaptureActivityLevel = () => {
  const activity = [
    {
      label: "Sedentary",
      description: "Little or no exercise, desk job",
      icon: Activity,
    },
    {
      label: "Light",
      description: "Light exercise 1-3 days/week",
      icon: Activity,
    },
    {
      label: "Moderate",
      description: "Moderate exercise 3-5 days/week",
      icon: Activity,
    },
    {
      label: "Active",
      description: "Hard exercise 6-7 days a week",
      icon: Activity,
    },
  ];
  const router = useRouter();
  const [showCalorieCalculation, setShowCalorieCalculation] =
    React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = () => {
    router.push("/(tabs)");
  };

  return (
    <VStack className="w-full max-w-sm p-4 gap-6">
      <VStack className="items-center gap-1">
        <Text className="text-2xl font-bold">Your Activity Level</Text>
        <Text className="text-sm text-center text-gray-400">
          Help us understand your lifestyle better
        </Text>
      </VStack>

      <FormElement error={errors.gender} className="gap-4">
        {activity.map(({ label, description, icon }) => (
          <Card
            key={label}
            variant="outline"
            className="flex-row items-center gap-4"
          >
            <IconContainer
              as={icon}
              className="bg-gray-700"
              iconClassName="text-white"
            />

            <VStack>
              <Text className="text-lg font-medium">{label}</Text>
              <Text className="text-sm dark:text-gray-300">{description}</Text>
            </VStack>
          </Card>
        ))}
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

      <Button onPress={handleSubmit}>
        <ButtonText>Complete Setup</ButtonText>
      </Button>
    </VStack>
  );
};
