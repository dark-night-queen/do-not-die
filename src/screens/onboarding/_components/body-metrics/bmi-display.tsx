// core components
import React from "react";

// core components
import {
  HStack,
  Card,
  Progress,
  ProgressGradientTrack,
  Text,
  VStack,
} from "@/components/ui";

type BMIDisplayProps = {
  bmi: number;
};

// component logic
export const BMIDisplay = ({ bmi }: BMIDisplayProps) => {
  const getWeightClassification = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const getBMICategoryColor = (bmiCategory: string) => {
    if (bmiCategory === "Underweight") return "text-blue-400";
    if (bmiCategory === "Normal weight") return "text-green-400";
    if (bmiCategory === "Overweight") return "text-yellow-400";
    return "text-red-400";
  };

  const getProgressColor = (bmi: number) => {
    if (!isFinite(bmi) || bmi <= 0) return ["#4b5563", "#9ca3af"];
    if (bmi < 18.5) return ["#2563eb", "#60a5fa"];
    if (bmi < 25) return ["#16a34a", "#4ade80"];
    if (bmi < 30) return ["#ca8a04", "#facc15"];
    return ["#dc2626", "#f87171"];
  };

  const bmiCategory = getWeightClassification(bmi);
  const bmiCategoryColor = getBMICategoryColor(bmiCategory);

  // Calculate progress percentage safely
  const minBmi = 15;
  const maxBmi = 35;
  const validBmi =
    typeof bmi === "number" && isFinite(bmi) ? Math.max(0, bmi) : 0;
  const progressPercentage = isFinite(validBmi)
    ? Math.min(Math.max(((bmi - minBmi) / (maxBmi - minBmi)) * 100, 0), 100)
    : 0;

  return (
    <Card size="lg" className="gap-6">
      <Text className="text-lg font-semibold">Body Mass Index (BMI)</Text>

      <HStack className="items-baseline gap-3">
        <Text className="text-4xl font-bold">{bmi.toFixed(1)}</Text>
        <Text className={`text-xl font-semibold ${bmiCategoryColor}`}>
          {bmiCategory}
        </Text>
      </HStack>

      <VStack>
        <Progress value={progressPercentage}>
          <ProgressGradientTrack colors={getProgressColor(validBmi)} />
        </Progress>

        <HStack className="justify-between">
          <Text className="text-sm">{minBmi}</Text>
          <Text className="text-sm">{(minBmi + maxBmi) / 2}</Text>
          <Text className="text-sm">{maxBmi}</Text>
        </HStack>
      </VStack>
    </Card>
  );
};
