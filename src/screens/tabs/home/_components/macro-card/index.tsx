// core components
import { HStack, Text, Card, Divider, VStack } from "@/components/ui";

// custom components
import { MacroCircle, MacroCircle2 } from "./macro-circle";

// handler functions
import { useProfileStore } from "@/store/useOnboardingStore";
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";

// component logic
export const MacroCard = () => {
  const { profile } = useProfileStore();
  const { nutrientAnalysis } = useNutrientAnalysisStore();

  const { targetMacroNutrient } = profile;
  const { calories, protein, carbs, fats } = nutrientAnalysis;

  return (
    <Card className="flex-row items-center gap-3 rounded-xl p-4">
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
            target={targetMacroNutrient?.proteinTarget}
            tintColor="#EF4444"
          />
          <MacroCircle
            name="Carbs"
            value={carbs}
            target={targetMacroNutrient?.carbsTarget}
            tintColor="#F59E0B"
          />
          <MacroCircle
            name="Fat"
            value={fats}
            target={targetMacroNutrient?.fatTarget}
            tintColor="#3B82F6"
          />
        </HStack>
      </VStack>
    </Card>
  );
};
