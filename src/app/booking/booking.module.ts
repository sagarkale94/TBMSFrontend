import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { MaterialModule } from '../material/material.module';
import { ChooseDateTimeComponent } from './choose-date-time/choose-date-time.component';
import { ChooseSeatComponent } from './choose-seat/choose-seat.component';


@NgModule({
  declarations: [BookingComponent, ChooseDateTimeComponent, ChooseSeatComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModule
  ]
})
export class BookingModule { }
