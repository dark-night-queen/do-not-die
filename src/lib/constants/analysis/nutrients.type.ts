type Micronutrient = {
  fiber: number;
  vitaminC: number;
  calcium: number;
  iron: number;
  potassium: number;
};

type Macronutrient = {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
};

type NutrientAnalysis = {
  userId: string;
  createdAt: string;
  healthScore: number;
  nutritionScore: number;
} & Macronutrient &
  Micronutrient;

export { Micronutrient, Macronutrient, NutrientAnalysis };
