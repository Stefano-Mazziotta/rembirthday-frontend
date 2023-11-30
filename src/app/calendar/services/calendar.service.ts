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
  }
}
