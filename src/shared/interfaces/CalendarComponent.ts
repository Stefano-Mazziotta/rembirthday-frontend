import { Month } from './month';

export interface CalendarComponent {
  today: Date;
  weekDays: string[];
  month: Month;
  celebrants: any;
  //getDaysInMonth(year: number, month: number): number;
}
