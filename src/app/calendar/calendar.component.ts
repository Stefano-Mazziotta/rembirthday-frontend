import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { DateComponent } from './components/date/date.component';
import { MONTHS, WEEK_DAYS } from '../../shared/AppConstants';
import { Month } from '../../shared/interfaces/month';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DateComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit, CalendarComponent {
  weekDays: string[] = WEEK_DAYS;
  monthsOptions: string[] = MONTHS;

  isOpenCreateDialog: boolean = false;

  today: Date = new Date();
  month: Month = {
    name: '',
    number: 0,
    year: 0,
    dates: [],
    calendar: [],
  };

  celebrants: any[] = [];

  constructor(private _calendarService: CalendarService) {}

  ngOnInit(): void {
    const { today } = this;

    this.month = this.initMonth(today);
    this.month.calendar = this.initCalendar(today);

    console.log(this.month);

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

  public setStatusDialog() {
    const { isOpenCreateDialog } = this;
    this.isOpenCreateDialog = !isOpenCreateDialog;
  }

  private initMonth(date: Date): Month {
    const year: number = this._calendarService.getYear(date);
    const monthNumber: number = this._calendarService.getMonthNumber(date);
    const monthName: string = this._calendarService.getMonthName(date);

    const monthDates = this._calendarService.getMonthDates(year, monthNumber);

    const month: Month = {
      name: monthName,
      number: monthNumber,
      year: year,
      dates: monthDates,
      calendar: [],
    };

    return month;
  }

  private initCalendar(today: Date): Date[] {
    let calendar: Date[] = [];

    const currentYear = this._calendarService.getYear(today);
    const currentMonth = this._calendarService.getMonthNumber(today);

    const previousDates: Date[] = this._calendarService.getPreviousDates(
      currentYear,
      currentMonth
    );
    const futureDates: Date[] = this._calendarService.getFutureDates(
      currentYear,
      currentMonth
    );

    calendar = calendar.concat(previousDates, this.month.dates, futureDates);
    return calendar;
  }
}
