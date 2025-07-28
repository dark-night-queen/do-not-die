// core components
import { Card, Divider, HStack, Text, VStack } from "@/components/ui";

// custom components
import { MacroCircle, MacroCircle2 } from "./macro-circle";

// handler functions
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";
import { useProfileStore } from "@/store/useOnboardingStore";

// component logic
export const MacroCard = () => {
  const { profile } = useProfileStore();
  const { nutrientAnalysis } = useNutrientAnalysisStore();

  const { targetMacroNutrient } = profile;
  const { calories, protein, carbs, fat } = nutrientAnalysis;

  return (
    <Card className="flex-row items-center gap-4 rounded-xl p-4">
      <MacroCircle2
        name="Calorie"
        value={calories}
        target={profile.dailyCalorieTarget}
      />

      <Divider className="h-16 opacity-60" orientation="vertical" />

      <VStack className="flex-[3] gap-3">
        <Text className="text-sm">Daily Macros Progress</Text>

        <HStack className="justify-between">
          <MacroCircle
            name="Protein"
            value={protein}
            target={targetMacroNutrient?.protein}
            tintColor="#EF4444"
          />
          <MacroCircle
            name="Carbs"
            value={carbs}
            target={targetMacroNutrient?.carbs}
            tintColor="#F59E0B"
          />
          <MacroCircle
            name="Fat"
            value={fat}
            target={targetMacroNutrient?.fat}
            tintColor="#3B82F6"
          />
        </HStack>
      </VStack>
    </Card>
  );
};
