import { create } from "zustand";
import { NutrientAnalysis } from "@/constants/analysis";
import {
  createNutrientAnalysis,
  getNutrientAnalysis,
  updateNutrientAnalysis,
} from "@/src/apis/nutrient-analysis";

/*
 * Nutrient Analysis Store
 * This store manages nutrient analysis data and actions related to nutrient analysis.
 */
interface NutrientAnalysisState {
  nutrientAnalysis: NutrientAnalysis;
}

interface NutrientAnalysisActions {
  getNutrientAnalysis: (
    userId: string,
    createdAt: string,
  ) => Promise<NutrientAnalysis>;
  createNutrientAnalysis: (
    analysis: NutrientAnalysis,
  ) => Promise<{ data: any; error: any }>;
  updateNutrientAnalysis: (
    analysis: Partial<NutrientAnalysis>,
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
  fats: 0,
  fiber: 0,
  vitaminC: 0,
  calcium: 0,
  iron: 0,
  potassium: 0,
};

export const useNutrientAnalysisStore = create<
  NutrientAnalysisState & NutrientAnalysisActions
>((set, get) => ({
  nutrientAnalysis: initNutrientAnalysis,

  getNutrientAnalysis: async (userId, createdAt) => {
    const { nutrientAnalysis } = get();
    if (
      nutrientAnalysis &&
      nutrientAnalysis.userId === userId &&
      nutrientAnalysis.createdAt === createdAt
    ) {
      return nutrientAnalysis;
    }

    const { data } = await getNutrientAnalysis(userId, createdAt);
    set({ nutrientAnalysis: data });
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
