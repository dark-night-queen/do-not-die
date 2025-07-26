import { create } from "zustand";
import { FoodAnalysis } from "@/constants/analysis";
import { getFoodAnalysis, createFoodAnalysis } from "@/src/apis/food-analysis";
import moment, { Moment } from "moment";

interface FoodAnalysisState {
  activeDate: Moment;
  foodAnalysis: FoodAnalysis[];
  activeUserId: string | null;
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
  activeUserId: null,
  activeDate: moment(),
  foodAnalysis: [],

  getFoodAnalysis: async (userId, createdAt) => {
    const { activeDate, foodAnalysis, activeUserId } = get();
    if (
      activeDate.format("DD MM YYYY") === createdAt.format("DD MM YYYY") &&
      activeUserId === userId
    ) {
      return foodAnalysis;
    }

    const { data } = await getFoodAnalysis(userId, createdAt.toISOString());
    if (data) {
      set({ foodAnalysis: data, activeUserId: userId, activeDate: createdAt });
    }
    return data;
  },
  createFoodAnalysis: async (userId, food) => {
    const { data, error } = await createFoodAnalysis({
      ...food,
      userId: userId,
    });

    set({ foodAnalysis: data });
    return { data, error };
  },
}));
