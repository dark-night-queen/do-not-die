// core components
import { HStack, Divider, VStack, Text } from "@/components/ui";

// custom components
import { MacroDistribution } from "./macro-distribution";
import { CalorieConsumed } from "./calorie-consumed";
import { DailyCutoffInfo } from "./daily-cutoff-info";

// handler functions
import { useCalendar } from "@/hooks/useCalendar";

// component logic
export const DailyReport = () => {
  const { activeDate } = useCalendar();

  return (
    <VStack className="gap-4">
      <HStack className="mb-2 items-center gap-4">
        <Divider className="flex-1 text-gray-400" />
        <Text className="text-sm text-gray-400">Daily Report</Text>
        <Divider className="flex-1 text-gray-400" />
      </HStack>

      <HStack className="items-baseline">
        <Text className="flex-1 text-xl font-semibold">Daily Summary</Text>
        <Text className="text-sm text-gray-400">
          {activeDate.format("MMM DD, YYYY")}
        </Text>
      </HStack>

      <DailyCutoffInfo />
      <CalorieConsumed />
      <MacroDistribution />
    </VStack>
  );
};
