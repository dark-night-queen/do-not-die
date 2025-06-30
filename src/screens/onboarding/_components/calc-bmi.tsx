import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Progress, ProgressGradientTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { useBodyMetricsStore } from "@/store/useOnboardingStore";
import React from "react";

type BMIDisplayProps = {
  bmi: number;
};

// TODO: Fix UI based upon og
export const BMIDisplay = ({ bmi }: BMIDisplayProps) => {
  const { getWeightClassification } = useBodyMetricsStore();
  const bmiCategory = getWeightClassification(bmi);

  const getBMICategoryColor = () => {
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

  // Calculate progress percentage safely
  const validBmi =
    typeof bmi === "number" && isFinite(bmi) ? Math.max(0, bmi) : 0;
  const progressPercentage = isFinite(validBmi)
    ? Math.min((validBmi / 40) * 100, 100)
    : 0;

  return (
    <Card size="lg" className="gap-6">
      <Text className="text-lg font-semibold">Body Mass Index (BMI)</Text>

      <Box className="items-baseline gap-3">
        <Text className="text-4xl font-bold">{bmi.toFixed(1)}</Text>
        <Text className={`text-xl font-semibold ${getBMICategoryColor()}`}>
          {bmiCategory}
        </Text>
      </Box>

      <Progress value={progressPercentage}>
        <ProgressGradientTrack colors={getProgressColor(validBmi)} />
      </Progress>
    </Card>
  );
};
