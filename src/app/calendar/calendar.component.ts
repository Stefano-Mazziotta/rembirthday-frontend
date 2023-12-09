import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';

type currentMonth = {
  name: string;
  number: number;
  year: number;
  dates: Date[];
};

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  celebrants: any[] = [];

  today: Date = new Date();
  currentMonth: currentMonth = {
    name: '',
    number: 0,
    year: 0,
    dates: [],
  };

  futureDates: Date[] = [];

  constructor(private _calendarService: CalendarService) {}

  ngOnInit(): void {
    const { currentMonth, today } = this;

    currentMonth.name = today.toLocaleString('default', { month: 'long' });
    currentMonth.number = today.getMonth() + 1; // getMonth -> 0 - 11 ... 0 = january...
    currentMonth.year = today.getFullYear();
    currentMonth.dates = this.getMonthDates(
      currentMonth.year,
      currentMonth.number
    );

    this.futureDates = this.getFutureDates();

    // console.log(this.futureDates);
    console.log(currentMonth);

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

  private getFutureDates(): Date[] {
    const futureDates: Date[] = [];

    for (let i = 1; i <= 30; i++) {
      const nextDate = new Date(this.today);
      nextDate.setDate(this.today.getDate() + i);
      futureDates.push(nextDate);
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
