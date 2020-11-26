import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesResponse } from '../models/moviesResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAllMovies(pageNo, pageSize) {
    return this.http.get<MoviesResponse>(`${environment.apiBaseUrl}movies/${pageSize}/${pageNo}`);
  }

}
