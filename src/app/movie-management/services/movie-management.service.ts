import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDResponse } from 'src/app/model/crudResponse';
import { environment } from 'src/environments/environment';
import { MoviesResponse } from 'src/app/movies/models/moviesResponse';
import { MovieResponse } from '../model/movieResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieManagementService {

  constructor(private http: HttpClient) { }

  getMovieDetails(movieId) {
    return this.http.get<MovieResponse>(`${environment.apiBaseUrl}movie/${movieId}`);
  }

  getAllMovies(pageNo, pageSize) {
    return this.http.get<MoviesResponse>(`${environment.apiBaseUrl}movies/${pageSize}/${pageNo}`);
  }

  addMovie(body) {
    return this.http.post<CRUDResponse>(`${environment.apiBaseUrl}movie/add`, body);
  }

  updateMovie(body, movieId) {
    return this.http.put<CRUDResponse>(`${environment.apiBaseUrl}movie/update/${movieId}`, body);
  }

  deleteMovie(movieId) {
    return this.http.put<CRUDResponse>(`${environment.apiBaseUrl}movie/delete/${movieId}`, {});
  }

}
