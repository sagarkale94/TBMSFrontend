import { Movie } from './movie';

export interface MoviesResponse {
  errCode: number,
  message: string,
  data: Movie[],
}
