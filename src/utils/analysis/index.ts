import { prompt } from "./prompt";

interface Micronutrients {
  fiber: number;
  vitaminC: number;
  calcium: number;
  iron: number;
  potassium: number;
}

interface Ingredient {
  name: string;
  amount: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  micronutrients: Micronutrients;
}

interface NutrientContent {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  micronutrients: Micronutrients;
}

interface FoodAnalysis extends NutrientContent {
  name: string;
  ingredients: Ingredient[];
  healthScore: number;
  nutritionScore: number;
}

const getPrompt = (foodName: string, servingSize: string) =>
  prompt(foodName, servingSize);

function calculateFoodItemHealthScore(foodItem: NutrientContent): number {
  // Calculate macro balance (40% of score)
  const totalMacros = foodItem.protein + foodItem.carbs + foodItem.fat;
  const proteinRatio = totalMacros > 0 ? foodItem.protein / totalMacros : 0;
  const carbsRatio = totalMacros > 0 ? foodItem.carbs / totalMacros : 0;
  const fatRatio = totalMacros > 0 ? foodItem.fat / totalMacros : 0;

  // Ideal macro ratios (approximate ranges)
  const idealProteinRatio = 0.3; // 30%
  const idealCarbsRatio = 0.4; // 40%
  const idealFatRatio = 0.3; // 30%

  const macroScore =
    ((1 -
      Math.abs(proteinRatio - idealProteinRatio) +
      (1 - Math.abs(carbsRatio - idealCarbsRatio)) +
      (1 - Math.abs(fatRatio - idealFatRatio))) /
      3) *
    4; // Max 4 points

  // Calculate micronutrient score (40% of score)
  const microTargets = {
    fiber: 30, // g
    vitaminC: 90, // mg
    calcium: 1000, // mg
    iron: 18, // mg
    potassium: 3500, // mg
  };

  const microScores = Object.entries(microTargets).map(([nutrient, target]) => {
    const value =
      foodItem.micronutrients[nutrient as keyof typeof foodItem.micronutrients];
    return Math.min(1, value / target);
  });

  const microScore =
    (microScores.reduce((sum, score) => sum + score, 0) / 5) * 4; // Max 4 points

  // Calculate calorie density score (20% of score)
  // Assume a reasonable calorie range per serving (100-600 calories)
  const idealCalorieRange = { min: 100, max: 600 };
  const calorieScore =
    foodItem.calories >= idealCalorieRange.min &&
    foodItem.calories <= idealCalorieRange.max
      ? 2
      : Math.max(0, 2 - Math.abs(foodItem.calories - 350) / 350); // Max 2 points

  // Calculate final score
  const finalScore = macroScore + microScore + calorieScore;

  // Round to one decimal place and ensure it's between 0 and 10
  return Math.min(10, Math.max(0, Math.round(finalScore * 10) / 10));
}

function calculateMicronutrientScore(micronutrients: Micronutrients): number {
  const dailyValues = {
    fiber: 30, // g
    vitaminC: 90, // mg
    calcium: 1000, // mg
    iron: 18, // mg
    potassium: 3500, // mg
  };

  // Calculate percentage of daily value for each micronutrient
  const percentages = Object.entries(micronutrients).map(
    ([nutrient, amount]) => {
      const dv = dailyValues[nutrient as keyof typeof dailyValues];
      return Math.min(100, (amount / dv) * 100);
    }
  );

  // Average percentage, max 3 points
  const avgPercentage =
    percentages.reduce((sum, p) => sum + p, 0) / percentages.length;
  return Math.min(3, avgPercentage / 33.33); // 33.33% DV = 1 point
}

function calculateNutritionScore(nutrients: NutrientContent): number {
  // console.log("Starting nutrition score calculation with:", nutrients);
  // Base score starts at 5 (neutral)
  let score = 5;
  // console.log("Initial score:", score);

  // Get calories per 100g (assuming standard portion)
  const caloriesPerHundred = nutrients.calories;

  // 1. Protein Quality Score (0-2 points)
  // Good protein content relative to calories
  const proteinScore = Math.min(
    2,
    ((nutrients.protein * 4) / caloriesPerHundred) * 5
  );
  score += proteinScore;
  // console.log("After protein score:", score, "(added", proteinScore, ")");

  // 2. Carb Quality Score (0-1 points)
  // Favor complex carbs (indicated by fiber presence)
  const fiberToCarbs =
    nutrients.carbs > 0 ? nutrients.micronutrients.fiber / nutrients.carbs : 0;
  const carbScore = Math.min(1, fiberToCarbs * 5);
  score += carbScore;
  // console.log("After carb score:", score, "(added", carbScore, ")");

  // 3. Fat Quality Score (0-1 points)
  // Moderate fat content is good
  const fatCaloriePercentage = (nutrients.fat * 9) / caloriesPerHundred;
  const fatScore =
    fatCaloriePercentage <= 0.35 ? 1 : fatCaloriePercentage <= 0.5 ? 0.5 : 0;
  score += fatScore;
  // console.log("After fat score:", score, "(added", fatScore, ")");

  // 4. Micronutrient Density Score (0-3 points)
  const microScore = calculateMicronutrientScore(nutrients.micronutrients);
  score += microScore;
  // console.log("After micro score:", score, "(added", microScore, ")");

  // 5. Nutrient Density Score (-2 to +1 points)
  // Calories per nutrient point
  const totalNutrients =
    nutrients.protein +
    nutrients.carbs +
    nutrients.fat +
    Object.values(nutrients.micronutrients).reduce((sum, val) => sum + val, 0);
  const nutrientDensity = totalNutrients / Math.max(1, caloriesPerHundred);
  const densityScore =
    nutrientDensity >= 1 ? 1 : nutrientDensity >= 0.5 ? 0 : -2;
  score += densityScore;
  // console.log("After density score:", score, "(added", densityScore, ")");

  // Ensure score is between 0 and 10 and has one decimal place
  const finalScore = Math.max(0, Math.min(10, score));
  // console.log("Final nutrition score:", finalScore);
  return Number(finalScore.toFixed(1));
}

function validateNumber(n: unknown): number {
  return Math.max(0, Number.isFinite(n as number) ? (n as number) : 0);
}

function cleanMicronutrients(
  micro: Partial<Micronutrients> = {}
): Micronutrients {
  return {
    fiber: validateNumber(micro.fiber),
    vitaminC: validateNumber(micro.vitaminC),
    calcium: validateNumber(micro.calcium),
    iron: validateNumber(micro.iron),
    potassium: validateNumber(micro.potassium),
  };
}

function cleanIngredient(ingredient: any): Ingredient {
  return {
    name: ingredient?.name || "Unknown ingredient",
    amount: ingredient?.amount || "Unknown amount",
    calories: validateNumber(ingredient?.calories),
    protein: validateNumber(ingredient?.protein),
    carbs: validateNumber(ingredient?.carbs),
    fat: validateNumber(ingredient?.fat),
    micronutrients: cleanMicronutrients(ingredient?.micronutrients),
  };
}

function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getCleanedText(response: any): string {
  if (!response) throw new Error("No response from Gemini API");
  const text = response.text();
  if (!text) throw new Error("Empty text response from Gemini API");
  return text.replace(/```json|```/g, "").trim();
}

function analyzeResponse(response: any): FoodAnalysis {
  try {
    const cleanedText = getCleanedText(response);
    let analysis: FoodAnalysis | { error: string };

    try {
      analysis = JSON.parse(cleanedText);
    } catch (parseError) {
      throw new Error("Unable to process analysis results: Invalid JSON");
    }

    if ("error" in analysis) throw new Error(analysis.error);

    // Validate and clean main analysis fields
    if (
      !analysis.name ||
      typeof analysis.name !== "string" ||
      !Number.isFinite(analysis.calories) ||
      analysis.calories < 0 ||
      !Number.isFinite(analysis.protein) ||
      analysis.protein < 0 ||
      !Number.isFinite(analysis.carbs) ||
      analysis.carbs < 0 ||
      !Number.isFinite(analysis.fat) ||
      analysis.fat < 0 ||
      !analysis.micronutrients ||
      !Array.isArray(analysis.ingredients)
    ) {
      throw new Error("Invalid analysis result: Missing or invalid data");
    }

    analysis.name = capitalizeWords(analysis.name);
    analysis.micronutrients = cleanMicronutrients(analysis.micronutrients);

    // Clean and validate ingredients
    analysis.ingredients = (analysis.ingredients || [])
      .map(cleanIngredient)
      .filter(Boolean);

    // Calculate health score for the analyzed food
    analysis.healthScore = calculateFoodItemHealthScore({ ...analysis });
    analysis.nutritionScore = calculateNutritionScore({ ...analysis });

    // console.log("Final analysis:", {
    //   name: analysis.name,
    //   calories: analysis.calories,
    //   protein: analysis.protein,
    //   carbs: analysis.carbs,
    //   fat: analysis.fat,
    //   healthScore: analysis.healthScore,
    //   nutritionScore: analysis.nutritionScore,
    // });

    return analysis;
  } catch (error) {
    console.error("Error in analyzeResponse:", error);
    if (error instanceof Error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
    throw new Error("Analysis failed: Unknown error");
  }
}

export { getPrompt, analyzeResponse };
