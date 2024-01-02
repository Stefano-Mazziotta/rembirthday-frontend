import { CalendarDate } from './CalendarDates';

export interface Month {
  name: string;
  number: number;
  year: number;
  dates: Date[];
  calendar: CalendarDate[];
}
