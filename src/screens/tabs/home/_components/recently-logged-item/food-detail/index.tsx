// core dependencies
import React from "react";

// core components
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@/components/ui/drawer";
import {
  HStack,
  Card,
  Text,
  VStack,
  Progress,
  ProgressFilledTrack,
  ProgressGradientTrack,
} from "@/components/ui";

// constants
import {
  foodMacroTargets,
  dMicroTargets,
  FoodAnalysis,
} from "@/constants/analysis";
import {
  FoodDetailHealthScore,
  FoodDetailMacros,
  FoodDetailMicros,
} from "@/constants/info/home";

// handler functions
import { getNutritionScoreDescription } from "@/utils/analysis/nutrition-score";
import { InfoPopover } from "../../../../../_components/info-popover";

type IFoodDetailProps = {
  itemInfo: FoodAnalysis | null;
  showDrawer: boolean;
  closeDrawer: () => void;
};

// component logic
// TODO: provide option to delete food item
// TODO: provide option to update food item
export const FoodDetail = ({
  showDrawer,
  closeDrawer,
  itemInfo,
}: IFoodDetailProps) => {
  const calcMacroProgress = (macro: keyof typeof foodMacroTargets) => {
    const value = itemInfo?.[macro] || 0;
    const target = foodMacroTargets[macro];

    return Math.min((value / target) * 100, 100);
  };

  const getMicroPercentage = (micro: keyof typeof dMicroTargets) => {
    const value = itemInfo?.[micro] || 0;
    const target = dMicroTargets[micro];
    return Math.round((value / target) * 100);
  };

  const getMicroColor = (percentage: number) => {
    if (percentage >= 75) return "text-green-400";
    if (percentage >= 50) return "text-yellow-400";
    return "text-gray-400";
  };

  if (!itemInfo) return;
  const healthScoreInfo = getNutritionScoreDescription(itemInfo.healthScore);
  return (
    <Drawer isOpen={showDrawer} onClose={closeDrawer} size="lg" anchor="bottom">
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <VStack>
            <Text size="3xl">{itemInfo.name}</Text>
            <Text>
              {itemInfo.calories} Calories ({itemInfo.quantity})
            </Text>
          </VStack>
        </DrawerHeader>

        <DrawerBody>
          <VStack className="gap-4">
            <HStack className="gap-4">
              {/* Health Score Card */}
              <Card className="flex-1">
                <HStack className="items-center justify-between">
                  <Text size="sm" className="text-gray-400">
                    Health Score
                  </Text>

                  <InfoPopover
                    size="sm"
                    className="text-gray-500"
                    {...FoodDetailHealthScore}
                  />
                </HStack>
                <Text className="font-bold">{itemInfo.healthScore} / 10</Text>

                <Progress
                  size="sm"
                  value={itemInfo.healthScore * 10}
                  className="mt-2"
                >
                  <ProgressGradientTrack
                    colors={["#ef4444", "#eab308", "#22c55e"]}
                  />
                </Progress>
                <HStack className="justify-between">
                  <Text size="xs" className="text-gray-400">
                    Poor
                  </Text>
                  <Text size="xs" className={healthScoreInfo.color}>
                    {healthScoreInfo.label}
                  </Text>
                  <Text size="xs" className="text-gray-400">
                    Excellent
                  </Text>
                </HStack>
              </Card>

              {/* Macros Card */}
              <Card className="flex-1 gap-2">
                <HStack className="items-center justify-between">
                  <Text size="sm" className="text-gray-400">
                    Macros
                  </Text>
                  <InfoPopover
                    size="sm"
                    className="text-gray-500"
                    {...FoodDetailMacros}
                  />
                </HStack>

                <VStack className="gap-1">
                  <HStack className="justify-between">
                    <Text size="xs" className="text-gray-300">
                      Protein
                    </Text>

                    <Text size="xs" className="font-bold">
                      {itemInfo.protein}g
                    </Text>
                  </HStack>
                  <Progress size="sm" value={calcMacroProgress("protein")}>
                    <ProgressFilledTrack className="bg-red-500" />
                  </Progress>
                </VStack>

                <VStack className="gap-1">
                  <HStack className="justify-between">
                    <Text size="xs" className="text-gray-300">
                      Carbs
                    </Text>

                    <Text size="xs" className="font-bold">
                      {itemInfo.carbs}g
                    </Text>
                  </HStack>

                  <Progress size="sm" value={calcMacroProgress("carbs")}>
                    <ProgressFilledTrack className="bg-amber-500" />
                  </Progress>
                </VStack>

                <VStack className="gap-1">
                  <HStack className="justify-between">
                    <Text size="xs" className="text-gray-300">
                      Fat
                    </Text>

                    <Text size="xs" className="font-bold">
                      {itemInfo.fat}g
                    </Text>
                  </HStack>
                  <Progress size="sm" value={calcMacroProgress("fat")}>
                    <ProgressFilledTrack className="bg-blue-500" />
                  </Progress>
                </VStack>
              </Card>
            </HStack>

            {/* Micros Card */}
            <Card className="gap-2">
              <HStack className="items-center justify-between">
                <Text size="sm" className="text-gray-400">
                  Micros
                </Text>
                <InfoPopover
                  size="sm"
                  className="text-gray-500"
                  {...FoodDetailMicros}
                />
              </HStack>

              <HStack className="justify-between">
                {[
                  { key: "fiber", label: "Fib" },
                  { key: "vitaminC", label: "Vit" },
                  { key: "calcium", label: "Cal" },
                  { key: "iron", label: "Iro" },
                  { key: "potassium", label: "Pot" },
                ].map(({ key, label }) => {
                  const percentage = getMicroPercentage(
                    key as keyof typeof dMicroTargets,
                  );

                  return (
                    <VStack key={key} className="items-center">
                      <Text
                        className={`font-bold ${getMicroColor(percentage)}`}
                      >
                        {percentage}%
                      </Text>
                      <Text size="xs" className="text-gray-400">
                        {label}
                      </Text>
                    </VStack>
                  );
                })}
              </HStack>
            </Card>

            {itemInfo.ingredients.length ? (
              <Card className="gap-2">
                <Text size="sm" className="text-gray-400">
                  Ingredients
                </Text>

                <HStack className="justify-between">
                  <Text size="xs" className="text-gray-400">
                    Name
                  </Text>
                  <Text size="xs" className="text-gray-400">
                    Calories
                  </Text>
                </HStack>

                <VStack className="gap-2">
                  {itemInfo.ingredients.map(({ name, calories }, index) => {
                    return (
                      <HStack key={index} className="justify-between">
                        <Text size="xs">{name}</Text>
                        <Text size="sm" className="ml-5">
                          {calories}
                        </Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </Card>
            ) : null}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
