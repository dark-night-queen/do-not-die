import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { getWeightUnitSystem } from "@/utils/units";
import {
  CardRadioElement,
  FormElement,
  InputElement,
  SelectElement,
} from "@/components/custom";
import {
  HStack,
  Icon,
  InputSlot,
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
} from "@/components/ui";
import {
  GoalDuration,
  GoalDurationOptions,
  GoalType,
  GoalTypeOptions,
} from "@/constants/user.goal.type";

interface IUserGoalsProps {
  formData: {
    type: GoalType;
    duration: GoalDuration;
    targetWeight: string;
    unitSystem: string;
  };
  errors: Record<string, string>;
  handleChange: (name: string) => (value: string) => void;
}

// TODO: add logic for progress towards goal
// TODO: fix initialValue of select from formData
export const UserGoals = ({
  formData,
  errors,
  handleChange,
}: IUserGoalsProps) => {
  const weightUnitSystem = getWeightUnitSystem(formData.unitSystem);

  return (
    <>
      <VStack className="items-center gap-1">
        <Text className="text-2xl font-bold">Let's Set Your Goal</Text>
        <Text className="text-sm text-center text-gray-400">
          Choose your primary fitness objective and set your target
        </Text>
      </VStack>

      <VStack className="gap-4">
        <FormElement error={errors.type}>
          <CardRadioElement
            options={GoalTypeOptions}
            value={formData.type}
            onChange={handleChange("type")}
          />
        </FormElement>

        <FormElement label="Target Weight" error={errors.targetWeight}>
          <InputElement
            placeholder="Enter Target Weight"
            value={formData.targetWeight}
            onChangeText={handleChange("targetWeight")}
            inputMode="decimal"
            keyboardType="decimal-pad"
          >
            <InputSlot className="px-3">
              <Text>{weightUnitSystem}</Text>
            </InputSlot>
          </InputElement>
        </FormElement>

        <FormElement label="Timeline" error={errors.duration}>
          <SelectElement
            options={GoalDurationOptions}
            selectedValue={formData.duration}
            onValueChange={handleChange("duration")}
          />
        </FormElement>
      </VStack>

      {/* Progress Towards Goal */}
      <VStack className="gap-4">
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
    </>
  );
};
