// core components
import { VStack } from "@/components/ui";

// custom components
import { Navigation } from "./navigation";
import { WeeklyCalendarDays } from "./weekly-calendar-days";

// custom components
export const WeeklyCalendar = () => {
  return (
    <VStack className="gap-5">
      <Navigation />
      <WeeklyCalendarDays />
    </VStack>
  );
};
