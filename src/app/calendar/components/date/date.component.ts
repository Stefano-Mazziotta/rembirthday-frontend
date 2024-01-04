import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CelebrantDto } from '../../../../shared/interfaces/CelebrantDto';
import { CelebrantComponent } from '../../../celebrant/celebrant.component';

@Component({
  selector: 'date',
  standalone: true,
  imports: [CelebrantComponent],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css',
})
export class DateComponent implements OnInit, OnChanges {
  @Input() date!: Date;
  @Input() celebrants: CelebrantDto[] = [];
  formatedDate: string = '';

  constructor() {}

  ngOnInit(): void {
    const { date } = this;
    this.formatedDate = this.getFormatedDate(date);
    console.log(this.celebrants);
  }

  ngOnChanges(): void {
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
