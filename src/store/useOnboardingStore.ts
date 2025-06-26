import { create } from "zustand";
import { supabase } from "@/utils/supabase";
import { cmToFeet, feetToCm, kgToLbs, lbsToKg } from "@/utils/units";
import {
  Gender,
  UnitSystem,
  UnitSystemOptions,
  DietaryPreference,
} from "@/constants/user.bodyMetric.type";
import { GoalDuration, GoalType } from "@/constants/user.goal.type";
import { ActivityLevel } from "@/constants/user.activity.type";

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
  updateOnboardingStatus: (
    isOnboardingComplete: boolean
  ) => {} | Promise<{ data: any; error: any }>;
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
        .eq("userId", profile.userId)
        .select();

      return { data, error };
    },
    updateOnboardingStatus: async (isOnboardingComplete) => {
      const { profile, updateProfile, setProfile } = get();

      if (!profile) return {};
      profile.isOnboardingComplete = isOnboardingComplete;
      const { data, error } = await updateProfile(profile);

      if (data?.[0]) setProfile(data[0]);
      return { data, error };
    },
  })
);

// state and actions for the Body Metrics store
interface BodyMetricsState {}

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
export const useBodyMetricsStore = create<
  BodyMetricsState & BodyMetricsActions
>((_set, get) => ({
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

// Goal type
export type Goal = {
  id?: number;
  profileId: number;
  type: GoalType;
  duration: GoalDuration;
  targetWeight: number;
};

// state and actions for the Goal store
interface GoalState {
  goal: Goal | null;
}

interface GoalActions {
  getGoal: (profileId: number) => Promise<Goal | null>;
  setGoal: (goal: Goal | null) => void;
  createGoal: (goal: Goal) => Promise<{ data: any; error: any }>;
  updateGoal: (goal: Partial<Goal>) => Promise<{ data: any; error: any }>;
}

// Goal Store
export const useGoalStore = create<GoalState & GoalActions>((set, get) => ({
  goal: null,

  getGoal: async (profileId) => {
    const { goal, setGoal } = get();
    if (goal && goal.profileId === profileId) {
      return goal;
    }

    const { data, error } = await supabase
      .from("Goal")
      .select()
      .eq("profileId", profileId);

    if (error) console.error("Error fetching user's goal:", error);

    const newGoal = data?.[0];
    if (newGoal) setGoal(newGoal);
    return newGoal ?? null;
  },

  setGoal: (goal) => {
    set({ goal });
  },

  createGoal: async (goal) => {
    const { data, error } = await supabase.from("Goal").insert(goal).select();
    return { data, error };
  },

  updateGoal: async (goal) => {
    const { data, error } = await supabase
      .from("Goal")
      .update(goal)
      .eq("profileId", goal.profileId)
      .select();

    return { data, error };
  },
}));

// Activity type
export type Activity = {
  id?: number;
  profileId: number;
  activityLevel: ActivityLevel;
};

// state and actions for the activity store
interface ActivityState {
  activity: Activity | null;
}

interface ActivityActions {
  getActivity: (profileId: number) => Promise<Activity | null>;
  setActivity: (activity: Activity | null) => void;
  createActivity: (activity: Activity) => Promise<{ data: any; error: any }>;
  updateActivity: (
    activity: Partial<Activity>
  ) => Promise<{ data: any; error: any }>;
}

export const useActivityStore = create<ActivityState & ActivityActions>(
  (set, get) => ({
    activity: null,

    getActivity: async (profileId) => {
      const { activity, setActivity } = get();
      if (activity && activity.profileId === profileId) {
        return activity;
      }

      const { data, error } = await supabase
        .from("Activity")
        .select()
        .eq("profileId", profileId);

      if (error) console.error("Error fetching user's activity:", error);

      const newActivity = data?.[0];
      if (newActivity) setActivity(newActivity);
      return newActivity ?? null;
    },
    setActivity: (activity) => set({ activity }),
    createActivity: async (activity) => {
      const { data, error } = await supabase
        .from("Activity")
        .insert(activity)
        .select();

      return { data, error };
    },
    updateActivity: async (activity) => {
      const { data, error } = await supabase
        .from("Activity")
        .update(activity)
        .eq("profileId", activity.profileId)
        .select();

      return { data, error };
    },
  })
);
