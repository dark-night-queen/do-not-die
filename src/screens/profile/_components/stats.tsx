import React from 'react';
import { Flame, Scale, Target } from 'lucide-react-native';
import { HStack, Text, Card, Icon, VStack } from '@/components/ui';

type IStatsProps = {
  currentWeight: number;
  targetWeight: number;
  dailyCalorieTarget: number;
}

type ICustomCard = {
  icon: any;
  className: string;
  name: string;
  value: string;
};

const CustomCard = ({ icon, className, name, value }: ICustomCard) => {
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

export const Stats = ({currentWeight, targetWeight, dailyCalorieTarget}:IStatsProps) => {
  return (
    <VStack className="gap-4">
      <HStack className="gap-4">
        <CustomCard icon={Scale} className="text-blue-400" value={`${currentWeight} kg`} name="Current Weight" />
        <CustomCard icon={Target} className="text-green-400" value={`${targetWeight} kg`} name="Target Weight" />
      </HStack>

      <HStack className="gap-4">
        <CustomCard
          icon={Flame}
          className="text-orange-400"
          value={`${dailyCalorieTarget} kcal`}
          name="Daily Calorie Target"
        />
      </HStack>
    </VStack>
  );
};
