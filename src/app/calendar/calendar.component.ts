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
  grid: number[];
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
    'Wedsneday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  grid: number[] = [];

  // futureDates: Date[] = [];

  constructor(private _calendarService: CalendarService) {}

  ngOnInit(): void {
    const { today } = this;

    this.currentMonth = this.setCurrentMonth();
    // this.futureDates = this.getFutureDates();

    // console.log(this.futureDates);
    console.log(this.currentMonth);

    // this.grid
    for (let index = 0; index < this.weekDays.length * 5; index++) {
      this.grid.push(index);
    }

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

  private setCurrentMonth(): month {
    const { today } = this;

    const currentYear: number = today.getFullYear();
    const currentMonthNumber: number = today.getMonth() + 1; // getMonth -> 0 - 11 ... 0 = january...
    const currentMonthName: string = today.toLocaleString('default', {
      month: 'long',
    });

    const currentDates = this.getMonthDates(currentYear, currentMonthNumber);

    const currentMonth: month = {
      name: currentMonthName,
      number: currentMonthNumber,
      year: currentYear,
      dates: currentDates,
    };

    return currentMonth;
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
