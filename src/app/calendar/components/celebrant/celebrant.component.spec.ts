import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebrantComponent } from './celebrant.component';

describe('CelebrantComponent', () => {
  let component: CelebrantComponent;
  let fixture: ComponentFixture<CelebrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelebrantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CelebrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
