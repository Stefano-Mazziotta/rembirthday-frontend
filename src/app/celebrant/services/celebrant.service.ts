import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CelebrantDto } from '../../../shared/interfaces/CelebrantDto';

@Injectable({
  providedIn: 'root',
})
export class CelebrantService {
  private celebrantApiURL: string = 'http://localhost:8000/api/celebrant';

  constructor(private http: HttpClient) {}

  public getCelebrants(): Observable<any> {
    return this.http.get(`${this.celebrantApiURL}`);
  }

  public getCelebrantsByDate(
    date: Date,
    celebrants: CelebrantDto[]
  ): CelebrantDto[] {
    let celebrantsByDate: CelebrantDto[] = [];

    celebrantsByDate = celebrants.filter((celebrant) => {
      const { birthday } = celebrant;
      const birthdate = new Date(`${birthday} `);

      return (
        birthdate.getDate() == date.getDate() &&
        birthdate.getMonth() == date.getMonth()
      );
    });

    return celebrantsByDate;
  }
}
