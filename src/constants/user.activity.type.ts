import { Activity } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";

// Define types
export type ActivityLevel =
  | "SEDENTARY"
  | "LIGHTLY_ACTIVE"
  | "MODERATELY_ACTIVE"
  | "VERY_ACTIVE";

// Define options for each type
export const ActivityLevelOptions: {
  label: string;
  description: string;
  value: ActivityLevel;
  icon: LucideIcon;
}[] = [
  {
    label: "Sedentary",
    description: "Little or no exercise, desk job",
    icon: Activity,
    value: "SEDENTARY",
  },
  {
    label: "Light",
    description: "Light exercise 1-3 days/week",
    icon: Activity,
    value: "LIGHTLY_ACTIVE",
  },
  {
    label: "Moderate",
    description: "Moderate exercise 3-5 days/week",
    icon: Activity,
    value: "MODERATELY_ACTIVE",
  },
  {
    label: "Active",
    description: "Hard exercise 6-7 days a week",
    icon: Activity,
    value: "VERY_ACTIVE",
  },
];
