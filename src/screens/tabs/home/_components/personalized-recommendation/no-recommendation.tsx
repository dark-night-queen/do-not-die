import React from "react";
import { Card, Text } from "@/components/ui";

export const NoRecommendation = () => {
  return (
    <Card>
      <Text className="text-center font-semibold text-gray-300 mb-2">
        Scan food items to get personalized recommendations.
      </Text>
      <Text className="text-center text-sm text-gray-400">
        Your daily report will be generated at 12am.
      </Text>
    </Card>
  );
};
