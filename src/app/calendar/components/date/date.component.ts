import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'date',
  standalone: true,
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css',
})
export class DateComponent implements OnInit {
  @Input() date!: Date;
  formatedDate: string = '';

  constructor() {}

  ngOnInit(): void {
    const { date } = this;
    this.formatedDate = this.getFormatedDate(date);
  }

  private getFormatedDate(date: Date): string {
    let formatedDate = '';

    if (date.getMonth() + 1 < 9) {
      formatedDate = `${date.getDate()}/0${date.getMonth() + 1}`;
      return formatedDate;
    }

    formatedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    return formatedDate;
  }
}
