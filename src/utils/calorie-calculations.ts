import { Activity, Goal, Profile } from "@/store/useOnboardingStore";
import { ActivityLevel } from "@/constants/user.activity.type";
import { Gender, UnitSystemOptions } from "@/constants/user.bodyMetric.type";
import { GoalTimeline } from "@/constants/user.goal.type";
import { feetToCm, kgToLbs } from "./units";

export class CalorieCalculations {
  age: number;
  weightKg: number;
  heightCm: number;
  gender: Gender;
  targetWeightKg: number;

  activityLevel: ActivityLevel;
  timeline: number;

  activityMultipliers: Record<ActivityLevel, number> = {
    SEDENTARY: 1.2, // Little or no exercise
    LIGHTLY_ACTIVE: 1.375, // Light exercise 1-3 times/week
    MODERATELY_ACTIVE: 1.55, // Moderate exercise 3-5 times/week
    VERY_ACTIVE: 1.725, // Hard exercise 6-7 times/week
  };

  constructor(profile: Profile, activity: Activity, goal: Goal) {
    // profile
    const unitSystem = profile.unitSystem;
    const weight = profile.weight ?? 0;
    const height = profile.height ?? 0;

    this.age = profile.age ?? 0;
    this.gender = profile.gender ?? "MALE";

    this.weightKg =
      unitSystem === UnitSystemOptions.Metric ? weight : kgToLbs(weight);

    if (unitSystem === UnitSystemOptions.Metric) {
      this.heightCm = height;
    } else {
      const [feetStr, inchesStr] = height.toString().split(".");
      const feet = Number(feetStr) || 0;
      const inches = Number(inchesStr) || 0;
      this.heightCm = feetToCm(feet, inches);
    }

    // activity
    this.activityLevel = activity.activityLevel ?? "SEDENTARY";

    // goal
    this.timeline = GoalTimeline[goal.duration ?? "LONG_TERM"];
    const targetWeight = goal.targetWeight ?? 0;
    this.targetWeightKg =
      unitSystem === UnitSystemOptions.Metric
        ? targetWeight
        : kgToLbs(targetWeight);
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  calculateBMR(): number {
    if (this.gender === "MALE")
      return 10 * this.weightKg + 6.25 * this.heightCm - 5 * this.age + 5;
    return 10 * this.weightKg + 6.25 * this.heightCm - 5 * this.age - 161;
  }

  // Calculate macronutrient targets
  calcTargetMacroNutrient(dailyCalorieTarget: number) {
    const proteinTarget = Math.round(this.weightKg * 2.2); // 2.2g per kg body weight
    const fatTarget = Math.round((dailyCalorieTarget * 0.25) / 9); // 25% of calories from fat

    // Calculate carbs based on remaining calories
    const proteinCalories = proteinTarget * 4;
    const fatCalories = fatTarget * 9;
    const carbCalories = dailyCalorieTarget - (proteinCalories + fatCalories);
    const carbTarget = Math.round(carbCalories / 4);

    return {
      proteinTarget,
      fatTarget,
      proteinCalories,
      fatCalories,
      carbCalories,
      carbTarget,
    };
  }

  calculateDailyCalories() {
    // Calculate BMR
    const bmr = this.calculateBMR();

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * this.activityMultipliers[this.activityLevel];

    // Calculate weight difference and required daily calorie adjustment
    const weightDifferenceKg = this.targetWeightKg - this.weightKg;
    const timelineInDays = this.timeline * 30; // Convert months to days
    const dailyWeightChangeKg = weightDifferenceKg / timelineInDays;

    // 7700 calories ≈ 1kg of body weight
    const calorieAdjustment = dailyWeightChangeKg * 7700;

    // Calculate target daily calories
    const dailyCalorieTarget = Math.round(tdee + calorieAdjustment);

    // Calculate macronutrient targets
    const targetMacroNutrient =
      this.calcTargetMacroNutrient(dailyCalorieTarget);

    // Calculate expected weekly change
    const weeklyWeightChange = (calorieAdjustment * 7) / 7700;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      dailyCalorieTarget,
      calorieAdjustment: Math.round(calorieAdjustment),
      weeklyWeightChange: Number(weeklyWeightChange.toFixed(2)),
      ...targetMacroNutrient,
    };
  }
}
