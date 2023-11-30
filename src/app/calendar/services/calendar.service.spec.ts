import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  let _calendarService: CalendarService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalendarService],
    });

    _calendarService = TestBed.inject(CalendarService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(_calendarService).toBeTruthy();
  });

  it('should retrieve celebrants from the API', () => {
    const mockCelebrants = [{ name: 'John', birthday: '1990-01-01' }];

    const req = httpTestingController.expectOne(
      'http://localhost:8000/api/celebrant'
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockCelebrants);
  });
});
