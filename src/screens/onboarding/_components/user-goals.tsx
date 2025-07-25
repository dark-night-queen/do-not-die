// core dependencies
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

// core components
import {
  HStack,
  Icon,
  InputSlot,
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
} from "@/components/ui";

// custom components
import {
  CardRadioElement,
  FormElement,
  InputElement,
  SelectElement,
} from "@/components/custom";

// handler functions
import { getWeightUnitSystem } from "@/utils/units";
import {
  GoalDuration,
  GoalDurationOptions,
  GoalType,
  GoalTypeOptions,
  GOAL_DURATION_LABEL,
} from "@/constants/user";

interface IUserGoalsProps {
  formData: {
    type?: GoalType;
    duration?: GoalDuration;
    targetWeight: string;
  };
  meta: {
    weight: string;
    unitSystem: string;
  };
  errors: Record<string, string>;
  handleChange: (name: string) => (value: string) => void;
}

// component logic
export const UserGoals = ({
  formData,
  meta,
  errors,
  handleChange,
}: IUserGoalsProps) => {
  const weightUnitSystem = getWeightUnitSystem(meta.unitSystem);

  const getProgressBarWidth = () => {
    if (!formData.targetWeight) return 50;

    const targetWeight = parseFloat(formData.targetWeight);
    const currentWeight = parseFloat(meta.weight);

    if (formData.type === "WEIGHT_LOSS") {
      if (targetWeight >= currentWeight) return 0;

      const progress = (currentWeight - targetWeight) / (currentWeight * 0.2);
      return Math.min(100, progress * 100);
    } else if (formData.type === "WEIGHT_GAIN") {
      if (currentWeight >= targetWeight) return 0;

      const progress = (targetWeight - currentWeight) / (currentWeight * 0.2);
      return Math.min(100, progress * 100);
    }
  };

  return (
    <>
      <VStack className="items-center gap-1 mb-4">
        <Text className="text-2xl font-bold">Let&apos;s Set Your Goal</Text>
        <Text className="text-sm text-center text-gray-400">
          Choose your primary fitness objective and set your target
        </Text>
      </VStack>

      <FormElement>
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

      <FormElement label="Timeline">
        <SelectElement
          options={GoalDurationOptions}
          selectedValue={
            formData.duration
              ? GOAL_DURATION_LABEL[formData.duration] || formData.duration
              : ""
          }
          onValueChange={handleChange("duration")}
        />
      </FormElement>

      {/* Progress Towards Goal */}
      <Text className="text-sm font-medium text-typography-900">
        Progress Towards Goal
      </Text>

      <Progress value={getProgressBarWidth()}>
        <ProgressFilledTrack className="bg-indigo-600" />
      </Progress>

      <HStack>
        <HStack className="flex-1 items-center">
          <Text className="text-xs text-gray-400">
            {meta.weight} {weightUnitSystem}
          </Text>
          <Icon as={ArrowRight} size="sm" className="text-gray-400" />
        </HStack>

        <HStack className="items-center">
          <Icon as={ArrowLeft} size="sm" className="text-gray-400" />
          <Text className="text-xs text-gray-400">
            {formData.targetWeight} {weightUnitSystem}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};
