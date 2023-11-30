import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './services/calendar.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let _calendarService: jasmine.SpyObj<CalendarService>;

  beforeEach(async () => {
    _calendarService = jasmine.createSpyObj('CalendarService', [
      'getBirthdays',
    ]);

    TestBed.configureTestingModule({
      imports: [CalendarComponent],
      providers: [{ provide: CalendarService, useValue: _calendarService }],
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve celebrants on initialization', () => {
    const mockCelebrants = [{ name: 'John', birthday: '1990-01-01' }];

    _calendarService.getCelebrants.and.returnValue(of(mockCelebrants));

    fixture.detectChanges();

    expect(component.celebrants).toEqual(mockCelebrants);
  });
});
