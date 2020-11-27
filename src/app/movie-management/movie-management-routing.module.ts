import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list.component';
import { DateAndTimeSlotComponent } from './date-and-time-slot/date-and-time-slot.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movie-list',
    pathMatch: 'full'
  },
  {
    path: 'movie-list',
    component: MovieListComponent
  },
  {
    path: 'date-time-slot/:movieId',
    component: DateAndTimeSlotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieManagementRoutingModule { }
