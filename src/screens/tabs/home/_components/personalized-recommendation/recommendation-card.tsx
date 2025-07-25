// core dependencies
import React from "react";
import { LucideIcon } from "lucide-react-native";

// core components
import { HStack, Card, Text, Icon } from "@/components/ui";

interface IRecommendationCardProps extends React.PropsWithChildren {
  as: LucideIcon;
  className: string;
}

// component logic
export const RecommendationCard = ({
  as,
  className,
  children,
}: IRecommendationCardProps) => {
  return (
    <Card>
      <HStack className="items-start gap-3">
        {<Icon as={as} className={className} />}
        <Text className="flex-1 text-sm">{children}</Text>
      </HStack>
    </Card>
  );
};
