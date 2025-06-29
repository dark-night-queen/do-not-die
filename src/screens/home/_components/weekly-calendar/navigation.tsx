import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { HStack, Text, Button, ButtonIcon } from "@/components/ui";
import { useCalendarStore } from "@/store/useWeeklyCalendar";

export const Navigation = () => {
  const { navigateWeek, currentMonthName, isNextDisabled } = useCalendarStore();

  return (
    <HStack className="items-center justify-between">
      {/* Left Nav Button */}
      <Button
        variant="link"
        className="p-2"
        onPress={() => navigateWeek("prev")}
      >
        <ButtonIcon as={ChevronLeft} />
      </Button>

      {/* Title */}
      <Text className="font-semibold">{currentMonthName}</Text>

      {/* Right Nav Button */}
      <Button
        variant="link"
        className="p-2"
        onPress={() => navigateWeek("next")}
        disabled={isNextDisabled}
      >
        <ButtonIcon
          as={ChevronRight}
          className={isNextDisabled ? "opacity-40" : ""}
        />
      </Button>
    </HStack>
  );
};
