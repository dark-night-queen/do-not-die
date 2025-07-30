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
  fat: number;
};

type NutrientAnalysis = {
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  healthScore: number;
  nutritionScore: number;
} & Macronutrient &
  Micronutrient;

type Ingredient = {
  name: string;
  quantity: string;
  micronutrients: Micronutrient;
} & Macronutrient;

type FoodAnalysis = NutrientAnalysis & {
  name: string;
  quantity: string;
  ingredients: Ingredient[];
};

export {
  Micronutrient,
  Macronutrient,
  FoodAnalysis,
  Ingredient,
  NutrientAnalysis,
};
