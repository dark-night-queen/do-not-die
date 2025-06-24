import { create } from "zustand";
import { supabase } from "@/utils/supabase";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export enum UnitSystem {
  IMPERIAL = "Imperial",
  METRIC = "Metric",
}

export enum DietaryPreference {
  VEGAN = "Vegan",
  VEGETARIAN = "Vegetarian",
  NON_VEGETARIAN = "Non-Vegetarian",
}

export type Profile = {
  id?: number;
  userId: string;
  age?: number;
  height?: number;
  weight?: number;
  gender?: keyof typeof Gender;
  unitSystem?: keyof typeof UnitSystem;
  dietaryPreference?: keyof typeof DietaryPreference;
  isOnboardingComplete?: boolean;
  // goal?: "Weight Loss" | "Weight Gain";
  // goalDuration?: "1 month" | "3 month" | "6 month";
  // activityLevel?: "Sedentary" | "Lightly Active" | "Moderately Active" | "Very Active" | "Super Active";
  createdAt?: string;
  updatedAt?: string;
};

interface ProfileState {
  profile: Profile | null;
}
interface ProfileActions {
  getProfile: (userId: string) => Promise<Profile | null>;
  setProfile: (profile: Profile) => void;
  createProfile: (userId: string) => Promise<{ data: any; error: any }>;
  // updateProfile: (profile: Partial<Profile>) => Promise<void>;
}

export const useProfileStore = create<ProfileState & ProfileActions>(
  (set, get) => ({
    profile: null,

    getProfile: async (userId: string) => {
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

    setProfile: (profile: Profile) => {
      set({ profile });
    },

    createProfile: async (userId: string) => {
      const { data, error } = await supabase
        .from("Profile")
        .insert({
          userId,
        })
        .select();

      return { data, error };
    },

    // updateProfile: async (profileUpdates: Partial<Profile>) => {
    //   set({ isProfileUpdating: true });
    //   try {
    //     const updatedProfile = await updateProfileInAPI(profileUpdates);
    //     set({ profile: updatedProfile, isProfileUpdating: false, isProfileUpdateSuccess: true });
    //   } catch (error) {
    //     set({ isProfileUpdateError: true, isProfileUpdating: false });
    //   }
    // },
  })
);

interface OnboardingState {}

interface OnboardingActions {}

export const useOnboardingStore = create<OnboardingState & OnboardingActions>(
  (set, get) => ({})
);
