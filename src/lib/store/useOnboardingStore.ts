import { create } from "zustand";
import { Profile, User, UNIT_SYSTEM } from "@/constants/user";
import {
  getUser,
  createUser,
  getProfile,
  createProfile,
  updateProfile,
  resetOnboarding,
} from "@/src/apis/onboarding";

/*
 * User Store
  - This store manages user data and actions related to user management.
 */
interface UserState {
  user: User;
}
interface UserActions {
  getUser: (id: string) => Promise<User | null>;
  setUser: (user: User) => void;
  createUser: (user: User) => Promise<{ data: any; error: any }>;
}

const initUserState = {
  id: "",
  email: "",
};

const useUserStore = create<UserState & UserActions>((set, get) => ({
  user: initUserState,

  getUser: async (id) => {
    const { user } = get();
    if (user?.id === id) return user;

    const { data: newUser } = await getUser(id);
    if (newUser) set({ user: newUser });
    return newUser;
  },
  setUser: (user) => {
    set({ user });
  },
  createUser: async (user) => {
    const { data, error } = await createUser(user);
    return { data, error };
  },
}));

/*
 * Profile Store
  - This store manages user data and actions related to user management.
 */
interface ProfileState {
  profile: Profile | null;
}
interface ProfileActions {
  getProfile: (userId: string) => Promise<Profile | null>;
  createProfile: (profile: Profile) => Promise<{ data: any; error: any }>;
  updateProfile: (
    profile: Partial<Profile>,
  ) => Promise<{ data: any; error: any }>;
  resetOnboarding: () => void;
}

const initProfileState = {
  age: 0,
  displayHeight: 0,
  heightCm: 0,
  displayWeight: 0,
  weightKg: 0,
  displayTargetWeight: 0,
  targetWeightKg: 0,
  bmr: 0,
  tdee: 0,
  dailyCalorieTarget: 0,
  weeklyWeightChange: 0,
  gender: null,
  unitSystem: UNIT_SYSTEM.IMPERIAL,
  dietaryPreference: null,
  activityLevel: null,
  goalType: null,
  goalDuration: null,
  isOnboardingCompleted: false,
};

export const useProfileStore = create<ProfileState & ProfileActions>(
  (set, get) => ({
    profile: null,

    getProfile: async (userId) => {
      const { profile } = get();
      if (profile?.userId === userId) {
        return profile;
      }

      const { data: newProfile } = await getProfile(userId);
      if (newProfile) set({ profile: newProfile });
      return newProfile;
    },
    createProfile: async (profile) => {
      const { data, error } = await createProfile(profile);
      return { data, error };
    },
    updateProfile: async (profile) => {
      const { data, error } = await updateProfile(profile);
      return { data, error };
    },
    resetOnboarding: async () => {
      const { profile } = get();
      if (!profile) return;

      const updatedProfile: Profile = {
        ...initProfileState,
        userId: profile.userId,
      };

      await resetOnboarding(updatedProfile);
      set({ profile: null });
    },
  }),
);
export { initUserState, useUserStore };
