import { create } from "zustand";
import { supabase } from "@/utils/supabase";
import { cmToFeet, feetToCm, kgToLbs, lbsToKg } from "@/utils/units";
import {
  Gender,
  UnitSystem,
  UnitSystemOptions,
  DietaryPreference,
} from "@/constants/user.bodyMetric.type";

// Profile type
export type Profile = {
  id?: number;
  userId: string;
  age?: number;
  height?: number;
  weight?: number;
  gender?: Gender;
  unitSystem?: UnitSystem;
  dietaryPreference?: DietaryPreference;
  isOnboardingComplete?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// state and actions for the Profile store
interface ProfileState {
  profile: Profile | null;
}
interface ProfileActions {
  getProfile: (userId: string) => Promise<Profile | null>;
  setProfile: (profile: Profile | null) => void;
  createProfile: (profile: Profile) => Promise<{ data: any; error: any }>;
  updateProfile: (
    profile: Partial<Profile>
  ) => Promise<{ data: any; error: any }>;
}

// Profile store
export const useProfileStore = create<ProfileState & ProfileActions>(
  (set, get) => ({
    profile: null,

    getProfile: async (userId) => {
      const { profile, setProfile } = get();
      if (profile && profile.userId === userId) {
        return profile;
      }

      const { data, error } = await supabase
        .from("Profile")
        .select()
        .eq("userId", userId);

      if (error) console.error("Error fetching user's profile:", error);

      const newProfile = data?.[0];
      if (newProfile) setProfile(newProfile);
      return newProfile ?? null;
    },

    setProfile: (profile) => {
      set({ profile });
    },

    createProfile: async (profile) => {
      const { data, error } = await supabase
        .from("Profile")
        .insert(profile)
        .select();

      return { data, error };
    },

    updateProfile: async (profile) => {
      const { data, error } = await supabase
        .from("Profile")
        .update(profile)
        .eq("id", profile.id)
        .select();

      return { data, error };
    },
  })
);

// state and actions for the Body Metrics store
interface BodyMetricsActions {
  getDisplayHeight: (heightCm: string, unitSystem: UnitSystem) => string;
  getDisplayWeight: (weightKg: string, unitSystem: UnitSystem) => string;
  calculateBMI: (
    heightCm: string,
    weightKg: string,
    unitSystem: UnitSystem
  ) => number;
  getWeightClassification: (bmi: number) => string;
}

// Body Metrics store
export const useBodyMetricsStore = create<BodyMetricsActions>((_set, get) => ({
  getDisplayHeight: (heightCm, unitSystem) => {
    if (!heightCm) return heightCm;

    if (unitSystem === UnitSystemOptions.Imperial) {
      const [feetStr, inchesStr] = heightCm.split(".");
      const feet = Number(feetStr) || 0;
      const inches = Number(inchesStr) || 0;

      return feetToCm(feet, inches).toString();
    } else {
      const { feet, inches } = cmToFeet(parseInt(heightCm));
      return `${feet}.${inches}`;
    }
  },

  getDisplayWeight: (weightKg, unitSystem) => {
    if (unitSystem === UnitSystemOptions.Imperial) {
      return kgToLbs(parseFloat(weightKg)).toFixed(1);
    } else {
      return lbsToKg(parseFloat(weightKg)).toFixed(1);
    }
  },

  calculateBMI: (heightCm, weightKg, unitSystem) => {
    if (unitSystem === UnitSystemOptions.Imperial) {
      const { getDisplayHeight, getDisplayWeight } = get();

      heightCm = getDisplayHeight(heightCm, unitSystem);
      weightKg = getDisplayWeight(weightKg, unitSystem);
    }
    const heightM = parseInt(heightCm) / 100;
    if (!heightM) return 0;
    return parseInt(weightKg) / (heightM * heightM);
  },

  getWeightClassification: (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  },
}));
