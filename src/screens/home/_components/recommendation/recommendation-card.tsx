import React from "react";
import { HStack, Card, Icon, Text } from "@/components/ui";

type IRecommendationCardProps = {
  icon: any;
  className: string;
  value: string;
};

export const RecommendationCard = ({
  icon,
  className,
  value,
}: IRecommendationCardProps) => {
  return (
    <Card>
      <HStack className="items-start gap-3">
        <Icon as={icon} className={className} />
        <Text className="flex-1 text-sm">{value}</Text>
      </HStack>
    </Card>
  );
};
