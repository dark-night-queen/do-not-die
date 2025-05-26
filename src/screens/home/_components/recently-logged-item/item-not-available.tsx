import { Card, Text } from '@/components/ui';

export const NoItemAvailable = () => {
  return (
    <Card size="lg" className="mt-4">
      <Text className="text-center text-gray-400">No food items logged for this day</Text>
    </Card>
  );
};
