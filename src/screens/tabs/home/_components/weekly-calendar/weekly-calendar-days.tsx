// core dependencies
import React from "react";
import moment, { Moment } from "moment";

// core components
import { Box, Button, ButtonText, HStack } from "@/components/ui";

// handler functions
import { useCalendar } from "@/hooks/useCalendar";
import { useProfileStore, useUserStore } from "@/store/useOnboardingStore";
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";
import { useFoodAnalysisStore } from "@/store/useFoodAnalysisStore";

// custom components
const Day = ({ date, isActive }: { date: Moment; isActive: boolean }) => {
  const { profile } = useProfileStore();
  const { weeklyNutrientAnalysis } = useNutrientAnalysisStore();

  const isToday = date.isSame(moment(), "day");
  const isFuture = date.isAfter(moment(), "day");

  // weeklyNutrientAnalysis is assumed to be a map/object with date keys
  const dateKey = date.toISOString().split("T")[0];
  const hasData = !!weeklyNutrientAnalysis?.[dateKey];

  const hasExceededData =
    hasData &&
    weeklyNutrientAnalysis[dateKey].calories >
      (profile?.dailyCalorieTarget || 720);

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

// custom components
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

// custom components
export const WeeklyCalendarDays = () => {
  const { user } = useUserStore();
  const { activeDate, currentDate, currentWeek, setActiveDate } = useCalendar();
  const { getNutrientAnalysis, getWeeklyNutrientAnalysis } =
    useNutrientAnalysisStore();
  const { getFoodAnalysis } = useFoodAnalysisStore();

  React.useEffect(() => {
    const fetch = async () => {
      await getNutrientAnalysis(user.id, activeDate);
      await getFoodAnalysis(user.id, activeDate);
      await getWeeklyNutrientAnalysis(user.id, currentDate);
    };

    fetch();
  }, [
    activeDate,
    currentDate,
    getFoodAnalysis,
    getNutrientAnalysis,
    getWeeklyNutrientAnalysis,
    user.id,
  ]);

  React.useEffect(() => {
    const fetch = async () => {
      await getWeeklyNutrientAnalysis(user.id, currentDate);
    };

    fetch();
  }, [currentDate, getWeeklyNutrientAnalysis, user.id]);

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
