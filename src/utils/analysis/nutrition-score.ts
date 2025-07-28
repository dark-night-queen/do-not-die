export function getNutritionScoreDescription(score: number): {
  label: string;
  color: string;
  description: string;
} {
  if (score >= 8.5) {
    return {
      label: "Excellent",
      color: "text-emerald-400",
      description:
        "Exceptionally nutritious food with an optimal balance of nutrients",
    };
  } else if (score >= 7) {
    return {
      label: "Very Good",
      color: "text-green-400",
      description: "Highly nutritious food with good nutrient density",
    };
  } else if (score >= 5.5) {
    return {
      label: "Good",
      color: "text-green-400",
      description: "Nutritious food with balanced nutrients",
    };
  } else if (score >= 4) {
    return {
      label: "Fair",
      color: "text-yellow-400",
      description: "Moderately nutritious food",
    };
  } else if (score >= 2.5) {
    return {
      label: "Poor",
      color: "text-orange-400",
      description: "Limited nutritional value",
    };
  } else {
    return {
      label: "Very Poor",
      color: "text-rose-400",
      description: "Minimal nutritional value",
    };
  }
}
