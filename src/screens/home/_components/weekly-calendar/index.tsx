import { VStack } from "@/components/ui";
import { Navigation } from "./navigation";
import { WeeklyCalendarDays } from "./weekly-calendar-days";

export const WeeklyCalendar = () => {
  return (
    <VStack className="gap-5">
      <Navigation />
      <WeeklyCalendarDays />
    </VStack>
  );
};
