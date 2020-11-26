import { Movie } from 'src/app/movies/models/movie';

export interface MovieResponse {
  errCode: number,
  message: string,
  data: Movie,
}
