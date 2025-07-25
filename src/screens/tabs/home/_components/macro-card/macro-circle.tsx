// core dependencies
import { AlertCircle } from "lucide-react-native";

// core components
import { CircularProgress, HStack, Text, VStack } from "@/components/ui";

type IMacroCircleProps = {
  name: string;
  value?: number;
  target?: number;
  tintColor?: string;
};

// component logic
export const MacroCircle = (props: IMacroCircleProps) => {
  const { name, value = 0, target = 0, ...otherProps } = props;

  const fill = (value / target) * 100;
  const valueLeft = target - value;

  return (
    <VStack className="items-center justify-center gap-2">
      <CircularProgress size={60} width={8} fill={fill} {...otherProps}>
        {() => <Text className="text-xs">{value}g</Text>}
      </CircularProgress>

      <Text className="text-xs text-typography-200">{name}</Text>
      <Text className="text-xs">{valueLeft}g left</Text>
    </VStack>
  );
};

// component logic
export const MacroCircle2 = (props: IMacroCircleProps) => {
  const { name, value = 0, target = 0 } = props;

  const remaining = target - value;
  const isOverLimit = value > target;
  const excess = isOverLimit ? value - target : 0;
  const fill = Math.min((value / target) * 100, 100);

  const getProgressColor = () => {
    if (isOverLimit) return "#EF4444";
    if (fill > 90) return "#F59E0B";
    return "#8B5CF6";
  };

  return (
    <VStack className="max-w-[100px] flex-[2] items-center justify-center gap-2">
      <CircularProgress
        size={90}
        width={12}
        fill={fill}
        tintColor={getProgressColor()}
      >
        {() => (
          <Text className="text-sm">
            {isOverLimit ? `+${excess}` : remaining}
          </Text>
        )}
      </CircularProgress>

      <HStack className="justify-center">
        {isOverLimit ? <AlertCircle className="w-3 h-3 text-red-400" /> : null}
        <Text className="text-sm text-center">
          {isOverLimit ? "Over Daily Goal" : `${name} left`}
        </Text>
      </HStack>
    </VStack>
  );
};
