import type { Profile, ActivityLevel } from "@/constants/user";
import { GENDER, GOAL_DURATION } from "@/constants/user";

const ActivityMultipliers: Record<ActivityLevel, number> = {
  SEDENTARY: 1.2, // Little or no exercise
  LIGHTLY_ACTIVE: 1.375, // Light exercise 1-3 times/week
  MODERATELY_ACTIVE: 1.55, // Moderate exercise 3-5 times/week
  VERY_ACTIVE: 1.725, // Hard exercise 6-7 times/week
};

const GoalTimeline: Record<GOAL_DURATION, number> = {
  SHORT_TERM: 1,
  MEDIUM_TERM: 3,
  LONG_TERM: 6,
};

// Calculate BMR using Mifflin-St Jeor Equation
function calculateBMR(profile: Profile): number {
  const { age, gender, heightCm, weightKg } = profile;
  if (!age) return 0;

  if (gender === GENDER.Male)
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

function calcDailyCalorieAdjustments(profile: Profile) {
  const { targetWeightKg, weightKg, goalDuration } = profile;

  const timeline = goalDuration ? GoalTimeline[goalDuration] : 1;

  const weightDifferenceKg = (targetWeightKg ?? 0) - weightKg;
  const timelineInDays = timeline * 30; // Convert months to days
  const dailyWeightChangeKg = weightDifferenceKg / timelineInDays;

  return {
    // 7700 calories ≈ 1kg of body weight
    calorieAdjustment: dailyWeightChangeKg * 7700,
  };
}

// Calculate macronutrient targets
function calcTargetMacroNutrient(dailyCalorieTarget: number, weightKg: number) {
  const proteinTarget = Math.round(weightKg * 2.2); // 2.2g per kg body weight
  const fatTarget = Math.round((dailyCalorieTarget * 0.25) / 9); // 25% of calories from fat

  // Calculate carbs based on remaining calories
  const proteinCalories = proteinTarget * 4;
  const fatCalories = fatTarget * 9;
  const carbsCalories = dailyCalorieTarget - (proteinCalories + fatCalories);
  const carbsTarget = Math.round(carbsCalories / 4);

  return {
    proteinTarget,
    fatTarget,
    proteinCalories,
    fatCalories,
    carbsCalories,
    carbsTarget,
  };
}

function calculateDailyCalories(
  profile: Profile,
  activityLevel: ActivityLevel,
) {
  // Calculate BMR
  const bmr = calculateBMR(profile);

  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * ActivityMultipliers[activityLevel];

  // Calculate weight difference and required daily calorie adjustment
  const { calorieAdjustment } = calcDailyCalorieAdjustments(profile);

  // Calculate target daily calories
  const dailyCalorieTarget = Math.round(tdee + calorieAdjustment);

  // Calculate macronutrient targets
  const targetMacroNutrient = calcTargetMacroNutrient(
    dailyCalorieTarget,
    profile.weightKg,
  );

  // Calculate expected weekly change
  const weeklyWeightChange = (calorieAdjustment * 7) / 7700;
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    dailyCalorieTarget,
    calorieAdjustment: Math.round(calorieAdjustment),
    weeklyWeightChange: parseFloat(weeklyWeightChange.toFixed(2)),
    targetMacroNutrient: {
      proteinTarget: targetMacroNutrient.proteinTarget,
      fatTarget: targetMacroNutrient.fatTarget,
      carbsTarget: targetMacroNutrient.carbsTarget,
    },
  };
}

export { calculateDailyCalories };
