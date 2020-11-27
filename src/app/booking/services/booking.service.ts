import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResponse } from 'src/app/movie-management/model/movieResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient
  ) { }

  getMovieDatesAndTimeSlotByMovieId(movieId) {
    return this.http.get<MovieResponse>(`${environment.apiBaseUrl}movie/${movieId}`);
  }


}
