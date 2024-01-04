import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { DateComponent } from './components/date/date.component';
import { MONTHS, WEEK_DAYS } from '../../shared/AppConstants';
import { Month } from '../../shared/interfaces/Month';
import { CelebrantDto } from '../../shared/interfaces/CelebrantDto';
import { CalendarDate } from '../../shared/interfaces/CalendarDates';
import { CelebrantService } from '../celebrant/services/celebrant.service';
import { CreateCelebrantDialogComponent } from '../celebrant/components/create-celebrant-dialog/create-celebrant-dialog.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DateComponent, CreateCelebrantDialogComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit, CalendarComponent {
  weekDays: string[] = WEEK_DAYS;
  monthsOptions: string[] = MONTHS;

  isCreateDialogVisible: boolean = false;

  today: Date = new Date();
  month: Month = {
    name: '',
    number: 0,
    year: 0,
    dates: [],
    calendar: [],
  };

  celebrants: CelebrantDto[] = [];

  constructor(
    private _calendarService: CalendarService,
    private _celebrantService: CelebrantService
  ) {}

  ngOnInit(): void {
    const { today } = this;

    this.month = this.initMonth(today);

    console.log(this.month);

    this._celebrantService.getCelebrants().subscribe({
      next: (response) => {
        const { message, success, data } = response;
        if (success) {
          this.celebrants = data;
          this.month.calendar = this.initCalendar(today);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public openCreateCelebrantDialog() {
    this.isCreateDialogVisible = true;
  }

  public previousMonth(): void {
    const { month } = this;

    const FIRST_DATE = 0;
    const firstDate = month.dates[FIRST_DATE];

    const previousMonth = this._calendarService.getPreviousMonth(firstDate);

    this.month = this.initMonth(previousMonth);
    this.month.calendar = this.initCalendar(previousMonth);
  }
  public nextMonth(): void {
    const { month } = this;

    const FIRST_DATE = 0;
    const firstDate = month.dates[FIRST_DATE];

    const nextMonth = this._calendarService.getNextMonth(firstDate);

    this.month = this.initMonth(nextMonth);
    this.month.calendar = this.initCalendar(nextMonth);
  }
  public resetToday(): void {
    const { today } = this;
    this.month = this.initMonth(today);
    this.month.calendar = this.initCalendar(today);
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
  private initCalendar(date: Date): CalendarDate[] {
    const calendar: CalendarDate[] = [];

    const calendarDates = this._calendarService.getCalendarDates(
      date,
      this.month
    );

    for (const date of calendarDates) {
      const celebrantsByDate = this._celebrantService.getCelebrantsByDate(
        date,
        this.celebrants
      );

      calendar.push({ date, celebrants: celebrantsByDate });
    }

    return calendar;
  }
}
