import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCelebrantDialogComponent } from './create-celebrant-dialog.component';

describe('CreateCelebrantDialogComponent', () => {
  let component: CreateCelebrantDialogComponent;
  let fixture: ComponentFixture<CreateCelebrantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCelebrantDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCelebrantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
