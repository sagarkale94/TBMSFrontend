import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieManagementRoutingModule } from './movie-management-routing.module';
import { MovieListComponent } from './movie-list.component';
import { AddMovieComponent } from './add-movie/add-movie.component';


@NgModule({
  declarations: [MovieListComponent, AddMovieComponent],
  imports: [
    CommonModule,
    MovieManagementRoutingModule
  ]
})
export class MovieManagementModule { }
