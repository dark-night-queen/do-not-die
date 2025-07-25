import { create } from "zustand";
import moment, { Moment } from "moment";

interface CalendarState {
  activeDate: Moment;
  currentDate: Moment;
  currentWeek: Moment[];
  currentMonthName: string;
  isNextDisabled: boolean;
}

interface CalendarAction {
  navigateWeek: (direction: "prev" | "next") => void;
  setActiveDate: (date: Moment) => void;
}

const getStartOfWeek = (date: Moment) => date.clone().startOf("isoWeek");
const getEndOfWeek = (date: Moment) => date.clone().endOf("isoWeek");

function generateWeek(newDate: Moment) {
  return Array.from({ length: 7 }, (_, i) =>
    newDate.clone().startOf("isoWeek").add(i, "days"),
  );
}

function getCurrentMonthName(currentDate: Moment) {
  const startOfWeek = getStartOfWeek(currentDate);
  const endOfWeek = getEndOfWeek(currentDate);

  const previousMonth = startOfWeek.format("MMM");
  const currentMonth = endOfWeek.format("MMM");
  const year = endOfWeek.format("YYYY");

  if (startOfWeek.isSame(endOfWeek, "month")) {
    return `${currentMonth} ${year}`;
  }

  return `${previousMonth} - ${currentMonth} ${year}`;
}

export const useCalendar = create<CalendarState & CalendarAction>(
  (set, get) => ({
    activeDate: moment(),
    currentDate: moment(),
    currentWeek: generateWeek(moment()),
    currentMonthName: getCurrentMonthName(moment()),
    isNextDisabled: true,

    navigateWeek: (direction: "prev" | "next") => {
      const { currentDate } = get();
      const newDate =
        direction === "prev"
          ? currentDate.clone().subtract(1, "week")
          : currentDate.clone().add(1, "week");

      set({
        currentDate: newDate,
        currentWeek: generateWeek(newDate),
        isNextDisabled: !newDate.isBefore(moment(), "isoWeek"),
      });
    },

    setActiveDate: (date: Moment) => set({ activeDate: date }),
  }),
);
