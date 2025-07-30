// core components
import { HStack, Text, VStack } from "@/components/ui";

// custom components
import { RecommendationCard } from "./recommendation-card";
import { RecommendationPopover } from "./recommendation-popover";
import { NoRecommendation } from "./no-recommendation";

// handler functions
import { useProfileStore } from "@/store/useOnboardingStore";
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";
import { generateRecommendations } from "@/utils/daily-report";

// component logic
export const PersonalizedRecommendation = () => {
  const { profile } = useProfileStore();
  const { nutrientAnalysis } = useNutrientAnalysisStore();

  const recommendations = generateRecommendations(nutrientAnalysis, profile);

  if (!recommendations.length) {
    return <NoRecommendation />;
  }

  return (
    <VStack className="gap-4">
      <HStack className="items-center">
        <Text className="flex-1 text-xl font-semibold">
          Personalized Recommendation
        </Text>
        <RecommendationPopover />
      </HStack>

      {recommendations.map(({ icon, color, text }, index) => (
        <RecommendationCard key={index} as={icon} className={color}>
          {text}
        </RecommendationCard>
      ))}
    </VStack>
  );
};
