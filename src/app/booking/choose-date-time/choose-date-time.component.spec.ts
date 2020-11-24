import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDateTimeComponent } from './choose-date-time.component';

describe('ChooseDateTimeComponent', () => {
  let component: ChooseDateTimeComponent;
  let fixture: ComponentFixture<ChooseDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDateTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
