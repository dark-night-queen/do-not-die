import { HStack } from '@/components/ui';
import { HealthScore } from './health-score';
import { Micronutrient } from './micronutrient';

export const MetricsCard = () => {
  return (
    <HStack className="gap-4">
      <HealthScore />
      <Micronutrient />
    </HStack>
  );
};
