import { CelebrantDto } from './CelebrantDto';
import { Month } from './Month';

export interface CalendarComponent {
  today: Date;
  weekDays: string[];
  month: Month;
  celebrants: CelebrantDto;
  //getDaysInMonth(year: number, month: number): number;
}
