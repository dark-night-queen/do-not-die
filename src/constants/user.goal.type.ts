import { Dumbbell, Scale } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";

// Define types
export type GoalType = "WEIGHT_LOSS" | "WEIGHT_GAIN";
export type GoalDuration = "SHORT_TERM" | "MEDIUM_TERM" | "LONG_TERM";

// Define options for each type
export const GoalTypeOptions: {
  label: string;
  value: GoalType;
  icon: LucideIcon;
}[] = [
  {
    icon: Scale,
    label: "Lose Weight",
    value: "WEIGHT_LOSS",
  },
  {
    icon: Dumbbell,
    label: "Gain Weight",
    value: "WEIGHT_GAIN",
  },
];

export const GoalDurationOptions: { label: string; value: GoalDuration }[] = [
  {
    label: "1 month",
    value: "SHORT_TERM",
  },
  {
    label: "3 month",
    value: "MEDIUM_TERM",
  },
  {
    label: "6 month",
    value: "LONG_TERM",
  },
];

export const GoalTimeline: Record<GoalDuration, number> = {
  SHORT_TERM: 1,
  MEDIUM_TERM: 3,
  LONG_TERM: 6,
};
