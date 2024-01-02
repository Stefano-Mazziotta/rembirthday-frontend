import { TestBed } from '@angular/core/testing';

import { CelebrantService } from './celebrant.service';

describe('CelebrantService', () => {
  let service: CelebrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelebrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
