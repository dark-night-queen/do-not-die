import { create } from "zustand";
import { Moment } from "moment";
import {
  dCalorieTarget,
  dMacroTargets,
  FoodAnalysis,
  NutrientAnalysis,
} from "@/constants/analysis";
import { Profile } from "@/constants/user";
import {
  createNutrientAnalysis,
  getNutrientAnalysis,
  updateNutrientAnalysis,
} from "@/src/apis/nutrient-analysis";
import { calculateHealthScore } from "@/utils/analysis/health-score";

/*
 * Nutrient Analysis Store
 * This store manages nutrient analysis data and actions related to nutrient analysis.
 */
interface NutrientAnalysisState {
  macroTargets: typeof dMacroTargets;
  nutrientAnalysis: NutrientAnalysis;
  targetCalories: number;
}

interface NutrientAnalysisActions {
  init: (profile: Profile) => void;
  getNutrientAnalysis: (
    userId: string,
    createdAt: Moment,
  ) => Promise<NutrientAnalysis>;
  addFoodItem: (
    userId: string,
    analysis: FoodAnalysis,
  ) => Promise<{ data: any; error: any }>;
  createNutrientAnalysis: (
    analysis: NutrientAnalysis,
  ) => Promise<{ data: any; error: any }>;
  updateNutrientAnalysis: (
    analysis: NutrientAnalysis,
  ) => Promise<{ data: any; error: any }>;
}

const initNutrientAnalysis: NutrientAnalysis = {
  userId: "",
  createdAt: "",
  healthScore: 0,
  nutritionScore: 0,
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  vitaminC: 0,
  calcium: 0,
  iron: 0,
  potassium: 0,
};

export const useNutrientAnalysisStore = create<
  NutrientAnalysisState & NutrientAnalysisActions
>((set, get) => ({
  macroTargets: {
    protein: dMacroTargets.protein,
    carbs: dMacroTargets.carbs,
    fat: dMacroTargets.fat,
  },
  nutrientAnalysis: initNutrientAnalysis,
  targetCalories: dCalorieTarget,

  init: (profile) => {
    const macroTargets = {
      protein: profile.targetMacroNutrient?.protein || dMacroTargets.protein,
      carbs: profile.targetMacroNutrient?.carbs || dMacroTargets.carbs,
      fat: profile.targetMacroNutrient?.fat || dMacroTargets.fat,
    };

    const targetCalories = profile.dailyCalorieTarget ?? dCalorieTarget;
    set({ macroTargets, targetCalories });
  },

  addFoodItem: async (userId, foodItem) => {
    const {
      macroTargets,
      targetCalories,
      nutrientAnalysis,
      createNutrientAnalysis,
      updateNutrientAnalysis,
    } = get();

    const nutrientKeys = [
      "calories",
      "protein",
      "carbs",
      "fat",
      "fiber",
      "vitaminC",
      "calcium",
      "iron",
      "potassium",
    ] as const;

    const updatedData = {
      ...nutrientAnalysis,
      ...Object.fromEntries(
        nutrientKeys.map((key) => [
          key,
          nutrientAnalysis[key] + (foodItem[key] ?? 0),
        ]),
      ),
      userId,
      createdAt: foodItem.createdAt,
      updatedAt: foodItem.updatedAt,
    };

    updatedData.healthScore = calculateHealthScore(
      updatedData,
      macroTargets,
      targetCalories,
    );

    if (!nutrientAnalysis.userId) {
      return await createNutrientAnalysis(updatedData);
    }
    return await updateNutrientAnalysis(updatedData);
  },

  getNutrientAnalysis: async (userId, createdAt) => {
    const { data } = await getNutrientAnalysis(userId, createdAt);
    if (data) set({ nutrientAnalysis: data });
    else set({ nutrientAnalysis: initNutrientAnalysis });
    return data;
  },
  createNutrientAnalysis: async (analysis) => {
    const { data, error } = await createNutrientAnalysis(analysis);
    set({ nutrientAnalysis: data });
    return { data, error };
  },
  updateNutrientAnalysis: async (analysis) => {
    const { data, error } = await updateNutrientAnalysis(analysis);
    set((state) => ({
      nutrientAnalysis: { ...state.nutrientAnalysis, ...data },
    }));
    return { data, error };
  },
}));
