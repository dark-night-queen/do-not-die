import { Text, VStack } from "@/components/ui";

export type InfoText = {
  header: string;
  description: any;
  footer?: string;
};

export const HealthScoreCalculation: InfoText = {
  header: "Health Score",
  description: (
    <VStack className="gap-1">
      <Text size="sm">Your health score is calculated from:</Text>
      <Text size="sm">• Macronutrient Balance (30%)</Text>
      <Text size="sm">• Micronutrient Content (40%)</Text>
      <Text size="sm">• Calorie Target Progress (30%)</Text>
    </VStack>
  ),
};

export const FoodDetailHealthScore: InfoText = {
  header: "Health Score",
  description: (
    <VStack className="gap-1">
      <Text size="sm">The Health Score is a 0-10 rating that considers:</Text>
      <Text size="sm">• Nutrient density</Text>
      <Text size="sm">• Macro balance</Text>
      <Text size="sm">• Micronutrient content</Text>
      <Text size="sm">• Calorie content</Text>
    </VStack>
  ),
  footer: "Higher scores indicate more nutritious foods.",
};

export const FoodDetailMacros: InfoText = {
  header: "Macronutrients",
  description: (
    <VStack className="gap-1">
      <Text size="sm">Daily targets:</Text>
      <Text size="sm">• Protein: 50g (4 calories per gram)</Text>
      <Text size="sm">• Carbs: 100g (4 calories per gram)</Text>
      <Text size="sm">• Fat: 30g (9 calories per gram)</Text>
    </VStack>
  ),
};

export const FoodDetailMicros: InfoText = {
  header: "Micronutrients",
  description: (
    <VStack className="gap-1">
      <Text size="sm">Daily recommended values:</Text>
      <Text size="sm">• Fiber: 30g - Aids digestion</Text>
      <Text size="sm">• Vitamin C: 90mg - Immune support</Text>
      <Text size="sm">• Calcium: 1000mg - Bone health</Text>
      <Text size="sm">• Iron: 18mg - Blood health</Text>
      <Text size="sm">• Potassium: 3500mg - Heart health</Text>
    </VStack>
  ),
};
