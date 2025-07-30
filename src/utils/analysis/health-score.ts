import type { NutrientAnalysis } from "@/constants/analysis";
import { dMacroTargets, dMicroTargets } from "@/constants/analysis";

/*
    These calculations are used exclusively for nutrient score.
    However, there may be discrepancies, as the logic may differ from analysis/index.ts,
    which is used for calculating each food item's health score.
    Please review and create a unified logic.
*/

export function calculateHealthScore(
  data: NutrientAnalysis,
  macroTargets: typeof dMacroTargets,
  targetCalories: number,
): number {
  const isZeroNutrition =
    data.calories === 0 &&
    data.protein === 0 &&
    data.carbs === 0 &&
    data.fat === 0 &&
    data.fiber === 0 &&
    data.vitaminC === 0 &&
    data.calcium === 0 &&
    data.iron === 0 &&
    data.potassium === 0;

  if (isZeroNutrition) return 0;

  // Calculate macro score (30% of total)
  const proteinPercentage = data.protein / macroTargets.protein;
  const carbsPercentage = data.carbs / macroTargets.carbs;
  const fatPercentage = data.fat / macroTargets.fat;

  const macroScore =
    ((Math.min(1, proteinPercentage) +
      Math.min(1, carbsPercentage) +
      Math.min(1, fatPercentage)) /
      3) *
    3; // Max 3 points

  // Calculate micro score (40% of total)
  const microPercentages = {
    fiber: data.fiber / dMicroTargets.fiber,
    vitaminC: data.vitaminC / dMicroTargets.vitaminC,
    calcium: data.calcium / dMicroTargets.calcium,
    iron: data.iron / dMicroTargets.iron,
    potassium: data.potassium / dMicroTargets.potassium,
  };

  const microScore =
    (Object.values(microPercentages).reduce(
      (sum, percentage) => sum + Math.min(1, percentage),
      0,
    ) /
      5) *
    4; // Max 4 points

  // Calculate calorie score (30% of total)
  const consumedCalories = targetCalories - data.calories;
  const caloriePercentage = consumedCalories / targetCalories;
  const calorieScore = Math.max(0, 3 - Math.abs(1 - caloriePercentage) * 3); // Max 3 points

  // Calculate final score
  const finalScore = macroScore + microScore + calorieScore;

  // Round to one decimal place and ensure it's between 0 and 10
  return Math.min(10, Math.max(0, Math.round(finalScore * 10) / 10));
}
