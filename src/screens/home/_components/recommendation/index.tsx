import { Info, TrendingDown } from 'lucide-react-native';
import { HStack, Icon, Text, VStack } from '@/components/ui';
import { RecommendationCard } from './recommendation-card';

export const PersonalizedRecommendation = () => {
  return (
    <VStack className="gap-4">
      <HStack className="items-center">
        <Text className="flex-1 text-xl font-semibold">Personalized Recommendation</Text>
        <Icon as={Info} />
      </HStack>

      <RecommendationCard
        icon={TrendingDown}
        className="text-blue-400"
        value="You're 1108 calories under your target. Try adding a nutritious snack like Greek yogurt with
        berries, a handful of nuts, or a banana with peanut butter to meet your calorie goal."
      />
    </VStack>
  );
};
