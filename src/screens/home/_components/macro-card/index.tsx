import { HStack, Text, Card, Divider, VStack } from '@/components/ui';
import { useNutrientStore } from '@/store/useNutrientsStore';
import { MacroCircle, MacroCircle2 } from './macro-circle';

export const MacroCard = () => {
  const {
    caloriesConsumed,
    targetCalories,
    proteinConsumed,
    targetProtein,
    carbsConsumed,
    targetCarbs,
    fatsConsumed,
    targetFats,
  } = useNutrientStore();

  return (
    <Card className="flex-row items-center gap-3 rounded-xl p-4">
      <MacroCircle2 name="Calorie" value={caloriesConsumed} target={targetCalories} />

      <Divider className="h-16 opacity-60" orientation="vertical" />

      <VStack className="flex-[3] gap-3">
        <Text className="text-sm">Daily Macros Progress</Text>

        <HStack className="justify-between">
          <MacroCircle
            name="Protein"
            value={proteinConsumed}
            target={targetProtein}
            tintColor="#EF4444"
          />
          <MacroCircle
            name="Carbs"
            value={carbsConsumed}
            target={targetCarbs}
            tintColor="#F59E0B"
          />
          <MacroCircle name="Fat" value={fatsConsumed} target={targetFats} tintColor="#3B82F6" />
        </HStack>
      </VStack>
    </Card>
  );
};
