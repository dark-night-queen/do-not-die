import { Activity, Dumbbell, Scale } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import {
  ACTIVITY_LEVEL,
  GOAL_TYPE,
  GOAL_DURATION,
  GOAL_DURATION_LABEL,
} from "./user.enum";

export const GoalTypeOptions: {
  label: string;
  value: GOAL_TYPE;
  icon: LucideIcon;
}[] = [
  {
    icon: Scale,
    label: "Lose Weight",
    value: GOAL_TYPE.WEIGHT_LOSS,
  },
  {
    icon: Dumbbell,
    label: "Gain Weight",
    value: GOAL_TYPE.WEIGHT_GAIN,
  },
];

export const GoalDurationOptions: { label: string; value: GOAL_DURATION }[] = [
  {
    label: GOAL_DURATION_LABEL.SHORT_TERM,
    value: GOAL_DURATION.SHORT_TERM,
  },
  {
    label: GOAL_DURATION_LABEL.MEDIUM_TERM,
    value: GOAL_DURATION.MEDIUM_TERM,
  },
  {
    label: GOAL_DURATION_LABEL.LONG_TERM,
    value: GOAL_DURATION.LONG_TERM,
  },
];

const ActivityLevelOptions: {
  label: string;
  description: string;
  value: ACTIVITY_LEVEL;
  icon: LucideIcon;
}[] = [
  {
    label: "Sedentary",
    description: "Little or no exercise, desk job",
    icon: Activity,
    value: ACTIVITY_LEVEL.SEDENTARY,
  },
  {
    label: "Light",
    description: "Light exercise 1-3 days/week",
    icon: Activity,
    value: ACTIVITY_LEVEL.LIGHTLY_ACTIVE,
  },
  {
    label: "Moderate",
    description: "Moderate exercise 3-5 days/week",
    icon: Activity,
    value: ACTIVITY_LEVEL.MODERATELY_ACTIVE,
  },
  {
    label: "Active",
    description: "Hard exercise 6-7 days a week",
    icon: Activity,
    value: ACTIVITY_LEVEL.VERY_ACTIVE,
  },
];

export { ActivityLevelOptions };
