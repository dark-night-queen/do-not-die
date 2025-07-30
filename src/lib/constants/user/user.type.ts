import {
  ACTIVITY_LEVEL,
  DIETARY_PREFERENCE,
  GENDER,
  GOAL_DURATION,
  GOAL_TYPE,
  UNIT_SYSTEM,
} from "./user.enum";

type ActivityLevel = ACTIVITY_LEVEL;
type DietaryPreference = DIETARY_PREFERENCE | null;
type GoalType = GOAL_TYPE;
type GoalDuration = GOAL_DURATION;
type Gender = GENDER | null;
type UnitSystem = UNIT_SYSTEM;

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type Profile = {
  id?: number;
  userId: string;

  age: number | null;
  isOnboardingCompleted?: boolean;

  heightCm: number;
  displayHeight: number | null;
  weightKg: number;
  displayWeight: number | null;
  targetWeightKg?: number;
  displayTargetWeight?: number | null;
  bmr?: number;
  tdee?: number;
  dailyCalorieTarget?: number;
  weeklyWeightChange?: number;

  gender: Gender;
  unitSystem?: UnitSystem;
  dietaryPreference?: DietaryPreference;
  activityLevel?: ActivityLevel | null;
  goalType?: GoalType | null;
  goalDuration?: GoalDuration | null;

  targetMacroNutrient?: {
    protein?: number;
    fat?: number;
    carbs?: number;
  };

  targetMicroNutrient?: {
    fiber: number;
    vitaminC: number;
    calcium: number;
    iron: number;
    potassium: number;
  };

  createdAt?: string;
  updatedAt?: string;
};

export type {
  ActivityLevel,
  DietaryPreference,
  Gender,
  GoalDuration,
  GoalType,
  UnitSystem,
  Profile,
  User,
};
