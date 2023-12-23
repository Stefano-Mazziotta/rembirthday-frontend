import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';

interface month {
  name: string;
  number: number;
  year: number;
  dates: Date[];
}

interface ICalendarComponent {
  today: Date;
  weekDays: string[];
  grid: Date[];
  currentMonth: month;
  celebrants: any;
  //getDaysInMonth(year: number, month: number): number;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
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

  grid: Date[] = [];

  constructor(private _calendarService: CalendarService) {}

  ngOnInit(): void {
    const { today } = this;

    this.currentMonth = this.initCurrentMonth(today);
    this.grid = this.initGrid(today);

    // console.log(this.futureDates);
    console.log(this.currentMonth);
    // this.grid = this.currentMonth.dates.slice();

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

  // private getMonthDates(year: number, month: number): (Date | null)[] {
  //   const monthDates: (Date | null)[] = [];
  //   const firstDayOfMonth = new Date(year, month - 1, 1); // Adjust month index

  //   // Get the starting day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  //   const startingDayOfWeek = firstDayOfMonth.getDay();

  //   // Offset to start from the correct weekday column in the calendar grid
  //   for (let i = 0; i < startingDayOfWeek; i++) {
  //     monthDates.push(null); // You can use null or any other value to represent empty cells
  //   }

  //   const daysInCurrentMonth: number = this.getDaysInMonth(year, month);

  //   for (let index = 1; index <= daysInCurrentMonth; index++) {
  //     const date = new Date(year, month - 1, index); // Adjust month index
  //     monthDates.push(date);
  //   }

  //   return monthDates;
  // }

  private initGrid(today: Date): Date[] {
    const previousDates: Date[] = [];
    const futuresDates: Date[] = [];

    let grid: Date[] = [];

    const currentYear = this.getYear(today);
    const currentMonth = this.getMonthNumber(today);

    // previous dates
    const firstDateOfMonth = new Date(currentYear, currentMonth - 1, 1); // Adjust month index
    const startingDayOfWeek = firstDateOfMonth.getDay(); // (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // Offset to start from the correct weekday column in the calendar grid
    for (let i = startingDayOfWeek; i > 0; i--) {
      const pastDate = new Date(firstDateOfMonth);
      pastDate.setDate(firstDateOfMonth.getDate() - i);

      previousDates.push(pastDate);
    }

    // futures dates
    const daysInCurrentMonth: number = this.getDaysInMonth(
      currentYear,
      currentMonth
    );
    const lastDateOfMonth = new Date(
      currentYear,
      currentMonth - 1,
      daysInCurrentMonth
    );
    const lastDayOfWeek = lastDateOfMonth.getDay();
    let dayCounter = lastDayOfWeek;

    // Offset to start from the correct weekday column in the calendar grid
    for (let i = 1; dayCounter < 6; i++) {
      const futureDate = new Date(lastDateOfMonth);
      futureDate.setDate(lastDateOfMonth.getDate() + i);

      futuresDates.push(futureDate);
      dayCounter++;
    }

    grid = grid.concat(previousDates, this.currentMonth.dates, futuresDates);
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

  // private getFutureDates(): Date[] {
  //   const futureDates: Date[] = [];

  //   for (let i = 1; i <= 30; i++) {
  //     const nextDate = new Date(this.today);
  //     nextDate.setDate(this.today.getDate() + i);
  //     futureDates.push(nextDate);
  //   }

  //   return futureDates;
  // }

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
