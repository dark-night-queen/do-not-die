// core dependencies
import {
  Beef,
  Fish,
  TrendingUp,
  TrendingDown,
  Wheat,
  Carrot,
} from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";

// constants
import { GOAL_TYPE, Profile } from "@/constants/user";
import { NutrientAnalysis } from "@/constants/analysis";

const calorieRecommendation = (calorieDeviation: number) => {
  if (calorieDeviation > 0) {
    return {
      icon: TrendingUp,
      color: "text-rose-400",
      text: `You're ${Math.abs(calorieDeviation)} calories over your target. Consider reducing portion sizes or choosing lower-calorie options like grilled chicken, steamed vegetables, or a light salad for your next meal.`,
    };
  } else {
    return {
      icon: TrendingDown,
      color: "text-blue-400",
      text: `You're ${Math.abs(calorieDeviation)} calories under your target. Try adding a nutritious snack like Greek yogurt with berries, a handful of nuts, or a banana with peanut butter to meet your calorie goal.`,
    };
  }
};

const proteinRecommendation = () => {
  return {
    icon: Beef,
    color: "text-red-400",
    text: `Your protein intake is low. Try to include more protein-rich foods like chicken breast, lean beef, fish, eggs, or plant-based options like tofu and lentils in your meals.`,
  };
};

const carbsRecommendation = (
  carbsConsumed: number,
  carbsTarget: number,
  goal: GOAL_TYPE,
) => {
  if (carbsConsumed < carbsTarget * 0.8) {
    return {
      icon: Wheat,
      color: "text-yellow-400",
      text: `Your carb intake is low. Include more complex carbohydrates like whole grain bread, brown rice, quinoa, or sweet potatoes in your diet for sustained energy.`,
    };
  } else if (
    carbsConsumed > carbsTarget * 1.2 &&
    goal === GOAL_TYPE.WEIGHT_LOSS
  ) {
    return {
      icon: Wheat,
      color: "text-yellow-400",
      text: `Your carb intake is high for your weight loss goal. Try swapping some high-carb foods for lower-carb alternatives like cauliflower rice, zucchini noodles, or lettuce wraps.`,
    };
  }
};

const fatsRecommendation = (fatConsumed: number, fatTarget: number) => {
  if (fatConsumed < fatTarget * 0.8) {
    return {
      icon: Fish,
      color: "text-blue-400",
      text: `Your fat intake is low. Include healthy fats from sources like avocados, nuts, seeds, olive oil, or fatty fish like salmon in your meals.`,
    };
  } else if (fatConsumed > fatTarget * 1.2) {
    return {
      icon: Fish,
      color: "text-blue-400",
      text: `Your fat intake is high. Try to reduce saturated fats and focus on healthier fat sources like avocados, nuts, and olive oil.`,
    };
  }
};

const micronutrientRecommendation = (lowMicronutrients: string) => {
  return {
    icon: Carrot,
    color: "text-orange-400",
    text: `Your intake of ${lowMicronutrients} is low. Try to include more fruits and vegetables like spinach, kale, oranges, and bell peppers to boost your micronutrient levels.`,
  };
};

const generateRecommendations = (
  nutrientAnalysis: NutrientAnalysis,
  profile: Profile,
) => {
  if (!nutrientAnalysis.calories) return [];

  const newRecommendations: {
    icon: LucideIcon;
    color: string;
    text: string;
  }[] = [];

  const totalCalories = profile.dailyCalorieTarget || 0;
  const goal = profile.goalType || GOAL_TYPE.WEIGHT_GAIN;

  const micronutrients = {
    fiber: nutrientAnalysis.fiber,
    vitaminC: nutrientAnalysis.vitaminC,
    calcium: nutrientAnalysis.calcium,
    iron: nutrientAnalysis.iron,
    potassium: nutrientAnalysis.potassium,
  };

  const calorieDeviation = nutrientAnalysis.calories - totalCalories;
  const weightKg = profile.weightKg;
  const proteinTarget = Math.round(weightKg * 1.6);
  const fatsTarget = Math.round(weightKg * 0.8);
  const carbsTarget = Math.round(
    (totalCalories - (proteinTarget * 4 + fatsTarget * 9)) / 4,
  );

  // Calorie recommendation
  if (Math.abs(calorieDeviation) > 200) {
    newRecommendations.push(calorieRecommendation(calorieDeviation));
  }

  // Protein recommendation
  if (nutrientAnalysis.protein < proteinTarget * 0.8) {
    newRecommendations.push(proteinRecommendation());
  }

  // Carbs recommendation
  const cr = carbsRecommendation(nutrientAnalysis.carbs, carbsTarget, goal);
  if (cr) newRecommendations.push(cr);

  // Fat recommendation
  const fr = fatsRecommendation(nutrientAnalysis.fats, fatsTarget);
  if (fr) newRecommendations.push(fr);

  // Micronutrient recommendation
  const lowMicronutrients = Object.entries(micronutrients)
    .filter(([_, value]) => (value as number) < 50)
    .map(([key, _]) => key);

  if (lowMicronutrients.length > 0) {
    newRecommendations.push(
      micronutrientRecommendation(lowMicronutrients.join(", ")),
    );
  }

  return newRecommendations;
};

export { generateRecommendations };
