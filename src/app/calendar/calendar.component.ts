import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  celebrants: any[] = [];

  constructor(private _calendarService: CalendarService) {}
  ngOnInit(): void {
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
}
