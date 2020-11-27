import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAndTimeSlotComponent } from './date-and-time-slot.component';

describe('DateAndTimeSlotComponent', () => {
  let component: DateAndTimeSlotComponent;
  let fixture: ComponentFixture<DateAndTimeSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateAndTimeSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAndTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
