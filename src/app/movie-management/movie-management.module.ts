import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieManagementRoutingModule } from './movie-management-routing.module';
import { MovieListComponent } from './movie-list.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [MovieListComponent, AddMovieComponent],
  imports: [
    CommonModule,
    MovieManagementRoutingModule,
    MaterialModule,
  ]
})
export class MovieManagementModule { }
