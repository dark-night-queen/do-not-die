// Define types
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type UnitSystem = "IMPERIAL" | "METRIC";
export type DietaryPreference = "VEGAN" | "VEGETARIAN" | "NON_VEGETARIAN";

// Define options for each type
export const GenderOptions: Record<string, Gender> = {
  Male: "MALE",
  Female: "FEMALE",
  Other: "OTHER",
};

export const UnitSystemOptions: Record<string, UnitSystem> = {
  Imperial: "IMPERIAL",
  Metric: "METRIC",
};

export const DietaryPreferenceOptions: Record<string, DietaryPreference> = {
  Vegan: "VEGAN",
  Vegetarian: "VEGETARIAN",
  "Non-Vegetarian": "NON_VEGETARIAN",
};
