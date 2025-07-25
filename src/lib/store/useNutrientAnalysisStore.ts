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
  nutrientAnalysis: NutrientAnalysis | null;
}

interface NutrientAnalysisActions {
  getNutrientAnalysis: (
    userId: string,
    createdAt: string,
  ) => Promise<NutrientAnalysis | null>;
  createNutrientAnalysis: (
    analysis: NutrientAnalysis,
  ) => Promise<{ data: any; error: any }>;
  updateNutrientAnalysis: (
    analysis: Partial<NutrientAnalysis>,
  ) => Promise<{ data: any; error: any }>;
}

export const useNutrientAnalysisStore = create<
  NutrientAnalysisState & NutrientAnalysisActions
>((set, get) => ({
  nutrientAnalysis: null,

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
