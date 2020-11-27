import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Movie } from './models/movie';
import { MovieService } from './services/movie.service';
import { ERR_CODE_SUCCESS, ERR_CODE_NO_RECORD, ERR_CODE_ERROR, API_ERR_MESSAGE } from '../app.constant';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  movies: Movie[] = [];
  pageNo = 0;
  pageSize = 12;
  isLoadMoreBtnDisabled: boolean = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private movieService: MovieService,
    private uiService: UiService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getAllMovies(this.pageNo, this.pageSize).subscribe(
      resp => {
        if (resp.errCode == ERR_CODE_SUCCESS) {
          this.movies = this.movies.concat(resp.data);
        } else if (resp.errCode == ERR_CODE_NO_RECORD) {
          this.isLoadMoreBtnDisabled = true;
          this.uiService.showSnackbar(resp.message);
        } else if (resp.errCode == ERR_CODE_ERROR) {
          this.uiService.showSnackbar(resp.message);
        }
      },
      err => {
        this.uiService.showSnackbar(API_ERR_MESSAGE);
      });
  }

  onLoadMoreBtnClick() {
    this.pageNo++;
    this.getAllMovies();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
