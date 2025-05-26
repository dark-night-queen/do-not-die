import React from 'react';
import { Clock } from 'lucide-react-native';
import { HStack, Card, Icon, Text } from '@/components/ui';

export const DailyCutoffInfo = () => {
  return (
    <Card
      variant="outline"
      className="gap-2 border border-indigo-900/50 bg-indigo-950/90 dark:bg-indigo-950/50">
      <HStack className="items-center gap-3">
        <Icon as={Clock} className="text-indigo-400" />
        <Text className="text-sm text-indigo-400">Daily Summary Cutoff: 12:00 AM</Text>
      </HStack>

      <Text className="text-sm text-indigo-300/80">
        Complete your meals before midnight for accurate tracking. Food logged after cutoff will
        count towards tomorrow.
      </Text>
    </Card>
  );
};
