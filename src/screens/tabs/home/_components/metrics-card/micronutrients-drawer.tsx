// core dependencies
import React from "react";
import { Info, LucideIcon } from "lucide-react-native";

// core components
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerBody,
} from "@/components/ui/drawer";
import {
  Icon,
  HStack,
  Text,
  VStack,
  Progress,
  ProgressFilledTrack,
} from "@/components/ui";
import { InfoAccordion } from "@/screens/_components";

type Micro = {
  name: string;
  value: number;
  target: number;
  unit: string;
  description: string;
  importance: string;
  icon: LucideIcon;
};

interface IMicronutrientDrawerProps {
  micronutrients: Micro[];
  showDrawer: boolean;
  closeDrawer: () => void;
}

// component logic
export const MicronutrientDrawer = ({
  micronutrients,
  showDrawer,
  closeDrawer,
}: IMicronutrientDrawerProps) => {
  const getProgressColor = (value: number) => {
    if (value >= 0.6) return "bg-green-500";
    else if (value <= 0.2) return "bg-red-500";
    return "bg-yellow-500";
  };

  const getHeader = ({ icon, name, value, target, unit }: Micro) => {
    const progress = value / target;

    return (
      <VStack className="gap-4 w-full">
        <HStack className="gap-4 items-center">
          <Icon size="sm" as={icon} />
          <Text className="flex-1">{name}</Text>
          <Text size="xs" className="text-gray-400">
            {value}/{target} {unit}
          </Text>
          <Icon size="sm" as={Info} />
        </HStack>
        <Progress size="sm" value={progress * 100}>
          <ProgressFilledTrack className={getProgressColor(progress)} />
        </Progress>
      </VStack>
    );
  };

  const getContent = ({ description, importance }: Micro) => {
    return (
      <VStack className="gap-2">
        <Text size="sm">{description}</Text>
        <Text size="sm" className="text-gray-400">
          {importance}
        </Text>
      </VStack>
    );
  };

  return (
    <Drawer isOpen={showDrawer} onClose={closeDrawer} size="md" anchor="bottom">
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerBody>
          <InfoAccordion
            item={micronutrients.map((micros) => ({
              value: micros.name,
              trigger: getHeader({ ...micros }),
              content: getContent({ ...micros }),
            }))}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
