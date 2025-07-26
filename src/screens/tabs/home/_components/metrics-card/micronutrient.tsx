// core dependencies
import React from "react";
import { Apple, Info, Bone, Heart, Leaf, Zap } from "lucide-react-native";

// core components
import { Card, Text, Icon, HStack, VStack } from "@/components/ui";

// handler functions
import { useProfileStore } from "@/store/useOnboardingStore";
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";

export const Micronutrient = () => {
  const { profile } = useProfileStore();
  const { nutrientAnalysis } = useNutrientAnalysisStore();
  const { targetMicroNutrient } = profile;

  const micronutrients = [
    {
      name: "Fiber",
      shortName: "Fib",
      value: nutrientAnalysis.fiber,
      target: targetMicroNutrient?.fiber,
      unit: "g",
      description:
        "Fiber aids digestion and helps maintain a healthy gut. Aim for 30g daily.",
      importance:
        "Essential for digestive health and maintaining steady blood sugar levels.",
      icon: Leaf,
    },
    {
      name: "Vitamin C",
      shortName: "VitC",
      value: nutrientAnalysis.vitaminC,
      target: targetMicroNutrient?.vitaminC,
      unit: "mg",
      description:
        "Vitamin C boosts immunity and aids in collagen production. Aim for 90mg daily.",
      importance:
        "Critical for immune function and skin health. Found in citrus fruits and vegetables.",
      icon: Apple,
    },
    {
      name: "Calcium",
      shortName: "Cal",
      value: nutrientAnalysis.calcium,
      target: targetMicroNutrient?.calcium,
      unit: "mg",
      description: "Calcium is vital for bone health. Aim for 1000mg daily.",
      importance:
        "Essential for strong bones and teeth. Also important for muscle function.",
      icon: Bone,
    },
    {
      name: "Iron",
      shortName: "Iro",
      value: nutrientAnalysis.iron,
      target: targetMicroNutrient?.iron,
      unit: "mg",
      description:
        "Iron is essential for blood health and energy. Aim for 18mg daily.",
      importance:
        "Crucial for oxygen transport in blood and preventing fatigue.",
      icon: Heart,
    },
    {
      name: "Potassium",
      shortName: "Pot",
      value: nutrientAnalysis.potassium,
      target: targetMicroNutrient?.potassium,
      unit: "mg",
      description:
        "Potassium regulates fluid balance and supports heart health. Aim for 3500mg daily.",
      importance:
        "Vital for heart rhythm, muscle contractions, and blood pressure regulation.",
      icon: Zap,
    },
  ];

  const getColor = (percent: number) => {
    if (percent >= 60) return "text-emerald-400";
    if (percent <= 20) return "text-red-500";
    return "text-background-600";
  };

  return (
    <Card className="gap-4 flex-1">
      <HStack className="items-center gap-2">
        <Icon as={Apple} className="text-indigo-400" />
        <Text className="flex-1 text-sm">Micronutrients</Text>
        <Icon as={Info} size="sm" />
      </HStack>

      <HStack className="items-center justify-between">
        {micronutrients.map((nutrient, index) => (
          <VStack key={index} className="items-center gap-1">
            <Text
              className={`text-[11px] font-bold ${getColor(nutrient.value)}`}
            >
              {nutrient.value}%
            </Text>
            <Text className="text-xs text-background-400">
              {nutrient.shortName}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Card>
  );
};
