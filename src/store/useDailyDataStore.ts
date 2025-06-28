import { create } from "zustand";
import { Profile } from "./useOnboardingStore";

interface DailyDataState {
  proteinTarget: number;
  fatTarget: number;
  carbsTarget: number;
  caloriesTarget: number;
}

interface DailyDataActions {
  init: (profile: Profile) => void;
}

export const useDailyDataStore = create<DailyDataState & DailyDataActions>(
  (set, get) => ({
    proteinTarget: 0,
    fatTarget: 0,
    carbsTarget: 0,
    caloriesTarget: 0,

    init: (profile) => {
      const weightKg = profile.weightKg || 70; // Default to 70kg if not set
      const personalizedCalorieTarget = profile.dailyCalorieTarget || 2000;

      // TODO: return if user has overconsumed calories
      const proteinTarget = Math.round(weightKg * 1.6);
      const fatTarget = Math.round(weightKg * 0.8);
      const remainingCalories =
        personalizedCalorieTarget - (proteinTarget * 4 + fatTarget * 9);
      const carbsTarget = Math.round(remainingCalories / 4);

      set({
        proteinTarget,
        fatTarget,
        carbsTarget,
        caloriesTarget: personalizedCalorieTarget,
      });
    },
  })
);
