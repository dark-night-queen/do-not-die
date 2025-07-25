// core components
import { HStack, Text, Card, Divider, VStack } from "@/components/ui";

// custom components
import { MacroCircle, MacroCircle2 } from "./macro-circle";

// handler functions
import { useProfileStore } from "@/store/useOnboardingStore";
// import { useNutrientStore } from "@/store/useNutrientsStore";

// component logic
export const MacroCard = () => {
  const { profile } = useProfileStore();
  const targetMacroNutrient = profile?.targetMacroNutrient;

  // const { caloriesConsumed, proteinConsumed, carbsConsumed, fatsConsumed } =
  //   useNutrientStore();

  return (
    <Card className="flex-row items-center gap-3 rounded-xl p-4">
      <MacroCircle2
        name="Calorie"
        // value={caloriesConsumed}
        target={profile?.dailyCalorieTarget}
      />

      <Divider className="h-16 opacity-60" orientation="vertical" />

      <VStack className="flex-[3] gap-3">
        <Text className="text-sm">Daily Macros Progress</Text>

        <HStack className="justify-between">
          <MacroCircle
            name="Protein"
            // value={proteinConsumed}
            target={targetMacroNutrient?.proteinTarget}
            tintColor="#EF4444"
          />
          <MacroCircle
            name="Carbs"
            // value={carbsConsumed}
            target={targetMacroNutrient?.carbsTarget}
            tintColor="#F59E0B"
          />
          <MacroCircle
            name="Fat"
            // value={fatsConsumed}
            target={targetMacroNutrient?.fatTarget}
            tintColor="#3B82F6"
          />
        </HStack>
      </VStack>
    </Card>
  );
};
