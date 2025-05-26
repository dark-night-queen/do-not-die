import moment, { Moment } from 'moment';
import { create } from 'zustand';

interface CalendarState {
  activeDate: Moment;
  currentDate: Moment;
  currentWeek: Moment[];
  navigateWeek: (direction: 'prev' | 'next') => void;
  setActiveDate: (date: Moment) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  activeDate: moment(),
  currentDate: moment(),
  currentWeek: Array.from({ length: 7 }, (_, i) => moment().startOf('isoWeek').add(i, 'days')),

  navigateWeek: (direction: 'prev' | 'next') => {
    const { currentDate } = get();
    const newDate =
      direction === 'prev'
        ? currentDate.clone().subtract(1, 'week')
        : currentDate.clone().add(1, 'week');

    set({
      currentDate: newDate,
      currentWeek: Array.from({ length: 7 }, (_, i) =>
        newDate.clone().startOf('isoWeek').add(i, 'days')
      ),
    });
  },
  setActiveDate: (date: Moment) => set({ activeDate: date }),
}));
