import { ChevronRight } from "lucide-react-native";
import { Text, Button, ButtonIcon, ButtonText, HStack } from "@/components/ui";
import { IconContainer } from "@/components/ui/icon/icon-container";

type IGhostButtonProps = {
  icon: any;
  name: string;
  showArrow?: boolean;
  value?: string;
  onPress?: any;
};

export const GhostButton = ({
  icon,
  name,
  showArrow,
  value,
  onPress,
}: IGhostButtonProps) => {
  return (
    <Button
      variant="link"
      className="items-center justify-start gap-4"
      onPress={onPress}
    >
      <IconContainer as={icon} className="dark:bg-gray-800" />
      <ButtonText className="flex-1 text-sm font-medium capitalize">
        {name}
      </ButtonText>

      <HStack className="items-center gap-2">
        {value && <Text className="text-sm text-gray-400">{value}</Text>}
        {showArrow && (
          <ButtonIcon as={ChevronRight} className="text-gray-600" />
        )}
      </HStack>
    </Button>
  );
};
