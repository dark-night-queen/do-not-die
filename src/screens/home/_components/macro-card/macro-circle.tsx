import React from 'react';
import { CircularProgress, Text, VStack } from '@/components/ui';

type IMacroCircleProps = {
  name: string;
  value: number;
  target: number;
  tintColor?: string;
};

export const MacroCircle = (props: IMacroCircleProps) => {
  const { name, value, target, ...otherProps } = props;

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

export const MacroCircle2 = (props: IMacroCircleProps) => {
  const { name, value, target } = props;

  const fill = (value / target) * 100;
  const valueLeft = target - value;

  return (
    <VStack className="max-w-[100px] flex-[2] items-center justify-center gap-2">
      <CircularProgress size={90} width={12} fill={fill}>
        {() => <Text className="text-sm">{valueLeft}</Text>}
      </CircularProgress>
      <Text className="text-sm">{name} Left</Text>
    </VStack>
  );
};
