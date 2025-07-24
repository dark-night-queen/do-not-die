import {
  ACTIVITY_LEVEL,
  DIETARY_PREFERENCE,
  GENDER,
  GOAL_DURATION,
  GOAL_TYPE,
  UNIT_SYSTEM,
} from "./user.enum";

type ActivityLevel = ACTIVITY_LEVEL | null;
type DietaryPreference = DIETARY_PREFERENCE | null;
type GoalType = GOAL_TYPE | null;
type GoalDuration = GOAL_DURATION | null;
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

  age: number;
  isOnboardingCompleted?: boolean;

  heightCm: number;
  displayHeight: number;
  weightKg: number;
  displayWeight: number;
  targetWeightKg: number;
  displayTargetWeight: number;
  bmr?: number;
  tdee?: number;
  dailyCalorieTarget?: number;
  weeklyWeightChange?: number;

  gender: Gender;
  unitSystem: UnitSystem;
  dietaryPreference: DietaryPreference;
  activityLevel: ActivityLevel;
  goalType: GoalType;
  goalDuration: GoalDuration;

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
