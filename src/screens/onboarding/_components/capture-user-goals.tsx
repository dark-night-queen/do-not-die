import React from "react";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Dumbbell, Scale } from "lucide-react-native";
import {
  VStack,
  Text,
  Button,
  ButtonText,
  Progress,
  ProgressFilledTrack,
  HStack,
  Icon,
} from "@/components/ui";
import {
  FormElement,
  InputElement,
  RadioElement2,
  SelectElement,
} from "@/components/ui/form-control/form";
import { Goal, GoalTimeline } from "@/constants/user.options";

export const CaptureUserGoals = () => {
  const goal = [
    {
      label: "Weight Loss",
      icon: Scale,
    },
    {
      label: "Weight Gain",
      icon: Dumbbell,
    },
  ];
  const goalTimeline = Object.values(GoalTimeline).map((timeline) => ({
    label: timeline,
    value: timeline,
  }));

  const router = useRouter();

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = () => {
    router.push("/(auth)/onboarding/activity");
  };

  return (
    <VStack className="w-full max-w-sm p-4 gap-6">
      <VStack className="items-center gap-1">
        <Text className="text-2xl font-bold">Let's Set Your Goal</Text>
        <Text className="text-sm text-center text-gray-400">
          Choose your primary fitness objective and set your target
        </Text>
      </VStack>

      <VStack className="w-full gap-4">
        <FormElement error={errors.gender}>
          <RadioElement2
            options={goal}
            // value={formData.gender}
            // onChange={handleChange("gender")}
          />
        </FormElement>

        <FormElement label="Target Weight" error={errors.weight}>
          <InputElement
            placeholder="Enter Target Weight"
            // value={displayWeight}
            // onChangeText={setWeight}
            inputMode="decimal"
            keyboardType="decimal-pad"
          >
            {/* <InputSlot className="px-3">
              <Text>{weightUnitSystem}</Text>
            </InputSlot> */}
          </InputElement>
        </FormElement>

        <FormElement label="Timeline">
          <SelectElement options={goalTimeline} />
        </FormElement>
      </VStack>

      <VStack className="w-full gap-4">
        <Text className="text-sm font-medium text-typography-900">
          Progress Towards Goal
        </Text>

        <Progress value={23}>
          <ProgressFilledTrack className="bg-indigo-600" />
        </Progress>

        <HStack>
          <HStack className="flex-1 items-center">
            <Text className="text-xs text-gray-400">0%</Text>
            <Icon as={ArrowRight} size="sm" className="text-gray-400" />
          </HStack>

          <HStack className="items-center">
            <Icon as={ArrowLeft} size="sm" className="text-gray-400" />
            <Text className="text-xs text-gray-400">100%</Text>
          </HStack>
        </HStack>
      </VStack>

      <Button onPress={handleSubmit}>
        <ButtonText>Continue</ButtonText>
      </Button>
    </VStack>
  );
};
