import { create } from "zustand";
import { FoodAnalysis } from "@/constants/analysis";
import { getFoodAnalysis, createFoodAnalysis } from "@/src/apis/food-analysis";
import { Moment } from "moment";

interface FoodAnalysisState {
  foodAnalysis: FoodAnalysis[];
}

interface FoodAnalysisActions {
  getFoodAnalysis: (userId: string, createdAt: Moment) => Promise<any[] | null>;
  createFoodAnalysis: (
    userId: string,
    food: FoodAnalysis,
  ) => Promise<{ data: any; error: any }>;
}

export const useFoodAnalysisStore = create<
  FoodAnalysisState & FoodAnalysisActions
>((set, get) => ({
  foodAnalysis: [],

  getFoodAnalysis: async (userId, createdAt) => {
    const { data } = await getFoodAnalysis(userId, createdAt);
    if (data) set({ foodAnalysis: data });
    return data;
  },
  createFoodAnalysis: async (userId, food) => {
    const { data, error } = await createFoodAnalysis({
      ...food,
      userId: userId,
    });
    return { data, error };
  },
}));
