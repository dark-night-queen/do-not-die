import { HStack, Text, Card, Divider, VStack } from "@/components/ui";
import { useNutrientStore } from "@/store/useNutrientsStore";
import { MacroCircle, MacroCircle2 } from "./macro-circle";
import { useDailyDataStore } from "@/store/useDailyDataStore";

export const MacroCard = () => {
  const { proteinTarget, fatTarget, carbsTarget, caloriesTarget } =
    useDailyDataStore();

  const { caloriesConsumed, proteinConsumed, carbsConsumed, fatsConsumed } =
    useNutrientStore();

  return (
    <Card className="flex-row items-center gap-3 rounded-xl p-4">
      <MacroCircle2
        name="Calorie"
        value={caloriesConsumed}
        target={caloriesTarget}
      />

      <Divider className="h-16 opacity-60" orientation="vertical" />

      <VStack className="flex-[3] gap-3">
        <Text className="text-sm">Daily Macros Progress</Text>

        <HStack className="justify-between">
          <MacroCircle
            name="Protein"
            value={proteinConsumed}
            target={proteinTarget}
            tintColor="#EF4444"
          />
          <MacroCircle
            name="Carbs"
            value={carbsConsumed}
            target={carbsTarget}
            tintColor="#F59E0B"
          />
          <MacroCircle
            name="Fat"
            value={fatsConsumed}
            target={fatTarget}
            tintColor="#3B82F6"
          />
        </HStack>
      </VStack>
    </Card>
  );
};
