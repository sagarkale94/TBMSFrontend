import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesResponse } from '../models/moviesResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAllMovies() {
    return this.http.get<MoviesResponse>("http://localhost:3001/movies");
  }

}
