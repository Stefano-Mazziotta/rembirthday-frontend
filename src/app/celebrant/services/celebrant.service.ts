import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CelebrantDto,
  CreateCelebrantDto,
} from '../../../shared/interfaces/CelebrantDto';

@Injectable({
  providedIn: 'root',
})
export class CelebrantService {
  private celebrantApiURL: string = 'http://localhost:8000/api/celebrant';

  constructor(private http: HttpClient) {}

  public getCelebrants(): Observable<any> {
    return this.http.get<any>(`${this.celebrantApiURL}`);
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

  public createCelebrant(celebrant: CreateCelebrantDto): Observable<any> {
    return this.http.post(this.celebrantApiURL, celebrant);
  }
}
