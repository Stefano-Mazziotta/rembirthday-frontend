import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiURl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  public getCelebrants(): Observable<any> {
    return this.http.get(`${this.apiURl}/celebrant`);
  } // move to celebrant service

  public getMonthDates(year: number, month: number): Date[] {
    const monthDates: Date[] = [];

    const daysInCurrentMonth: number = this.getDaysInMonth(year, month);

    for (let index = 1; index <= daysInCurrentMonth; index++) {
      const date = new Date(`${year}/${month}/${index}`);
      monthDates.push(date);
    }

    return monthDates;
  }
  public getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }
  public getYear(date: Date): number {
    return date.getFullYear();
  }
  public getMonthNumber(date: Date): number {
    const monthNumber = date.getMonth() + 1; // getMonth -> 0 - 11 ... 0 = january...
    return monthNumber;
  }
  public getMonthName(date: Date): string {
    const monthName = date.toLocaleString('default', {
      month: 'long',
    });

    return monthName;
  }
  public getPreviousDates(year: number, month: number) {
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
  public getFutureDates(year: number, month: number): Date[] {
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
  public getPreviousMonth(date: Date) {
    const previousMonth = new Date(date);
    previousMonth.setMonth(date.getMonth() - 1);

    return previousMonth;
  }
  public getNextMonth(date: Date) {
    const nextMonth = new Date(date);
    nextMonth.setMonth(date.getMonth() + 1);

    return nextMonth;
  }
}
