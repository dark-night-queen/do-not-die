// core dependencies
import React from "react";
import { Apple, Bone, Heart, Leaf, Zap } from "lucide-react-native";

// core components
import { HStack } from "@/components/ui";

// custom components
import { HealthScore } from "./health-score";
import { Micronutrient } from "./micronutrient";

// constants
import { HealthScoreCalculation } from "@/constants/info/home";

// handler functions
import { useProfileStore } from "@/store/useOnboardingStore";
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";
import { MicronutrientDrawer } from "./micronutrients-drawer";
import { dMicroTargets } from "@/constants/analysis";

// component logic
export const MetricsCard = () => {
  const { profile } = useProfileStore();
  const { targetMicroNutrient } = profile;

  const { nutrientAnalysis } = useNutrientAnalysisStore();
  const { healthScore } = nutrientAnalysis;

  const [showMicrosDrawer, setShowMicrosDrawer] = React.useState(false);

  const micronutrients = [
    {
      name: "Fiber",
      shortName: "Fib",
      value: nutrientAnalysis.fiber,
      target: targetMicroNutrient?.fiber || dMicroTargets.fiber,
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
      target: targetMicroNutrient?.vitaminC || dMicroTargets.vitaminC,
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
      target: targetMicroNutrient?.calcium || dMicroTargets.calcium,
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
      target: targetMicroNutrient?.iron || dMicroTargets.iron,
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
      target: targetMicroNutrient?.potassium || dMicroTargets.potassium,
      unit: "mg",
      description:
        "Potassium regulates fluid balance and supports heart health. Aim for 3500mg daily.",
      importance:
        "Vital for heart rhythm, muscle contractions, and blood pressure regulation.",
      icon: Zap,
    },
  ];

  const openDrawer = () => setShowMicrosDrawer(true);
  const closeDrawer = () => setShowMicrosDrawer(false);

  return (
    <HStack className="gap-4">
      <HealthScore
        healthScore={healthScore}
        info={{
          ...HealthScoreCalculation,
          header: HealthScoreCalculation.header + `: ${healthScore} / 10`,
        }}
      />
      <Micronutrient micronutrients={micronutrients} onPress={openDrawer} />
      <MicronutrientDrawer
        micronutrients={micronutrients}
        showDrawer={showMicrosDrawer}
        closeDrawer={closeDrawer}
      />
    </HStack>
  );
};
