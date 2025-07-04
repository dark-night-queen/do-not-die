import React from "react";
import { Box, Button, ButtonText, HStack } from "@/components/ui";
import moment, { Moment } from "moment";
import { useCalendarStore } from "@/store/useWeeklyCalendar";

const Day = ({ date, isActive }: { date: Moment; isActive: boolean }) => {
  const isToday = date.isSame(moment(), "day");
  const isFuture = date.isAfter(moment(), "day");
  const hasData = date.isSame(moment().subtract(1, "days"), "days");
  const hasExceededData = date.isSame(moment().subtract(3, "days"), "days");

  const containerStyle = isFuture
    ? "dark:bg-gray-800"
    : isToday
      ? "border-2 border-indigo-500"
      : hasData || hasExceededData
        ? "border-2 border-emerald-500"
        : "";

  const buttonTextStyle =
    isActive || isFuture ? "text-background-light" : "text-typography-700";

  return (
    <HStack
      className={`h-10 w-10 items-center justify-center rounded-full ${containerStyle}`}
    >
      <ButtonText className={`text-sm ${buttonTextStyle}`}>
        {date.format("DD")}
      </ButtonText>
      {hasExceededData ? (
        <Box className="bg-red-600 h-[8px] w-[8px] rounded-full absolute bottom-0 right-0" />
      ) : null}
    </HStack>
  );
};

const WeekDay = ({
  date,
  isActive,
  ...props
}: {
  date: Moment;
  isActive: boolean;
  onPress: () => void;
}) => {
  const isFuture = date.isAfter(moment(), "day");
  const buttonStyle = isFuture
    ? "opacity-40"
    : isActive
      ? "bg-indigo-800/50"
      : "";

  return (
    <Button
      variant="link"
      className={`flex-col rounded-xl text-sm font-semibold px-2 py-2 h-fit ${buttonStyle}`}
      disabled={isFuture}
      {...props}
    >
      <ButtonText
        className={isActive ? "text-background-light" : "text-typography-700"}
      >
        {date.format("ddd")}
      </ButtonText>

      <Day date={date} isActive={isActive} />
    </Button>
  );
};

export const WeeklyCalendarDays = () => {
  const { activeDate, currentWeek, setActiveDate } = useCalendarStore();

  return (
    <HStack className="items-center justify-between">
      {currentWeek.map((date, index) => {
        const isActive = date.isSame(activeDate, "day");
        return (
          <WeekDay
            key={index}
            date={date}
            isActive={isActive}
            onPress={() => setActiveDate(date)}
          />
        );
      })}
    </HStack>
  );
};
