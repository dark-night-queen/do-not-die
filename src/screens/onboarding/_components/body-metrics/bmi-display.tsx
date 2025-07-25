// core components
import React from "react";
import { Info } from "lucide-react-native";
import { MotiView } from "moti";

// core components
import {
  HStack,
  Card,
  Progress,
  ProgressGradientTrack,
  Text,
  VStack,
  Button,
  ButtonIcon,
} from "@/components/ui";

type BMIDisplayProps = {
  bmi: number;
};

// component logic
export const BMIDisplay = ({ bmi }: BMIDisplayProps) => {
  const [showInfo, setShowInfo] = React.useState(false);
  const toggleInfo = () => setShowInfo((prev) => !prev);

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
      <HStack className="justify-between items-center">
        <Text className="text-lg font-semibold">Body Mass Index (BMI)</Text>
        <Button variant="link" onPress={toggleInfo}>
          <ButtonIcon as={Info} />
        </Button>
      </HStack>

      <MotiView
        from={{ height: 0, opacity: 0 }}
        animate={{ height: showInfo ? 200 : 0, opacity: showInfo ? 1 : 0 }}
        transition={{ type: "timing", duration: 300 }}
        style={{ overflow: "hidden" }}
      >
        <Card className="dark:bg-gray-700/80 gap-2">
          <Text className="text-sm">BMI Categories:</Text>
          <VStack className="gap-1 pl-2">
            <Text className="text-sm">• Underweight: &lt; 18.5</Text>
            <Text className="text-sm">• Normal weight: 18.5 - 24.9</Text>
            <Text className="text-sm">• Overweight: 25 - 29.9</Text>
            <Text className="text-sm">• Obese: ≥ 30</Text>
          </VStack>

          <Text className="text-sm text-gray-400">
            Note: BMI is a general indicator and may not be accurate for
            athletes, elderly, or pregnant individuals.
          </Text>
        </Card>
      </MotiView>

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
