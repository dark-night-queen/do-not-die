// core components
import { HStack, Text, Card, Icon } from "@/components/ui";

type ICustomCard = {
  icon: any;
  className: string;
  name: string;
  value: string;
};

// component logic
export const CustomCard = ({ icon, className, name, value }: ICustomCard) => {
  return (
    <Card className="flex-1 gap-y-1 rounded-xl">
      <HStack className="items-center gap-2">
        <Icon as={icon} className={className} />
        <Text className="text-xs text-gray-400">{name}</Text>
      </HStack>
      <Text className="text-lg font-semibold">{value}</Text>
    </Card>
  );
};
