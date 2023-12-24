import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { DateComponent } from './components/date/date.component';

interface month {
  name: string;
  number: number;
  year: number;
  dates: Date[];
}

interface ICalendarComponent {
  today: Date;
  weekDays: string[];
  dates: Date[];
  currentMonth: month;
  celebrants: any;
  //getDaysInMonth(year: number, month: number): number;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DateComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit, ICalendarComponent {
  celebrants: any[] = [];

  today: Date = new Date();
  currentMonth: month = {
    name: '',
    number: 0,
    year: 0,
    dates: [],
  };
  weekDays: string[] = [
    'Sunday',
    'Monday',
    'Thuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  dates: Date[] = [];

  constructor(private _calendarService: CalendarService) {}

  ngOnInit(): void {
    const { today } = this;

    this.currentMonth = this.initCurrentMonth(today);
    this.dates = this.initCalendarDates(today);

    console.log(this.currentMonth);

    this._calendarService.getCelebrants().subscribe({
      next: (response) => {
        const { message, success, data } = response;
        if (success) {
          this.celebrants = data;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private initCurrentMonth(today: Date): month {
    const currentYear: number = this.getYear(today);
    const currentMonthNumber: number = this.getMonthNumber(today);
    const currentMonthName: string = this.getMonthName(today);

    const currentDates = this.getMonthDates(currentYear, currentMonthNumber);

    const currentMonth: month = {
      name: currentMonthName,
      number: currentMonthNumber,
      year: currentYear,
      dates: currentDates,
    };

    return currentMonth;
  }

  private initCalendarDates(today: Date): Date[] {
    let grid: Date[] = [];

    const currentYear = this.getYear(today);
    const currentMonth = this.getMonthNumber(today);

    const previousDates: Date[] = this.getPreviousDates(
      currentYear,
      currentMonth
    );
    const futureDates: Date[] = this.getFutureDates(currentYear, currentMonth);

    grid = grid.concat(previousDates, this.currentMonth.dates, futureDates);
    return grid;
  }

  private getYear(date: Date): number {
    return date.getFullYear();
  }

  private getMonthNumber(date: Date): number {
    const monthNumber = date.getMonth() + 1; // getMonth -> 0 - 11 ... 0 = january...
    return monthNumber;
  }

  private getMonthName(date: Date): string {
    const monthName = date.toLocaleString('default', {
      month: 'long',
    });

    return monthName;
  }

  private getPreviousDates(year: number, month: number) {
    const previousDates: Date[] = [];

    const firstDateOfMonth = new Date(year, month - 1, 1); // Adjust month index
    const startingDayOfWeek = firstDateOfMonth.getDay(); // (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // Offset to start from the correct weekday column in the calendar grid
    for (let i = startingDayOfWeek; i > 0; i--) {
      const pastDate = new Date(firstDateOfMonth);
      pastDate.setDate(firstDateOfMonth.getDate() - i);

      previousDates.push(pastDate);
    }

    return previousDates;
  }

  private getFutureDates(year: number, month: number): Date[] {
    const futureDates: Date[] = [];

    // futures dates
    const daysInMonth: number = this.getDaysInMonth(year, month);

    const lastDateOfMonth = new Date(year, month - 1, daysInMonth);
    const lastDayOfWeek = lastDateOfMonth.getDay();
    let dayCounter = lastDayOfWeek;

    // Offset to start from the correct weekday column in the calendar grid
    for (let i = 1; dayCounter < 6; i++) {
      const futureDate = new Date(lastDateOfMonth);
      futureDate.setDate(lastDateOfMonth.getDate() + i);

      futureDates.push(futureDate);
      dayCounter++;
    }

    return futureDates;
  }

  private getMonthDates(year: number, month: number): Date[] {
    const monthDates: Date[] = [];

    const daysInCurrentMonth: number = this.getDaysInMonth(year, month);

    for (let index = 1; index <= daysInCurrentMonth; index++) {
      const date = new Date(`${year}/${month}/${index}`);
      monthDates.push(date);
    }

    return monthDates;
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }
}
