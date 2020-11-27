import { Component, OnInit } from '@angular/core';
import { Movie } from '../movies/models/movie';
import { MovieService } from '../movies/services/movie.service';
import { UiService } from '../services/ui.service';
import { ERR_CODE_SUCCESS, ERR_CODE_NO_RECORD, ERR_CODE_ERROR, API_ERR_MESSAGE, ACTION_ADD, ACTION_EDIT } from '../app.constant';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieManagementService } from './services/movie-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  isNoRecordFound: boolean;
  pageNo: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['srNo', 'poster', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource();

  constructor(
    private movieService: MovieManagementService,
    private uiService: UiService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getAllMovies(this.pageNo, this.pageSize).subscribe(
      resp => {
        if (resp.errCode == ERR_CODE_SUCCESS) {
          this.dataSource = new MatTableDataSource(resp.data);
        } else if (resp.errCode == ERR_CODE_NO_RECORD) {
          if (this.pageNo == 0) {
            this.isNoRecordFound = true;
          }
          this.uiService.showSnackbar(resp.message);
        } else if (resp.errCode == ERR_CODE_ERROR) {
          this.uiService.showSnackbar(resp.message);
        }
      },
      err => {
        this.uiService.showSnackbar(API_ERR_MESSAGE);
      });
  }

  onPageChangeClicked(pageNo: any) {
    this.pageNo = pageNo.pageIndex;
    this.getAllMovies();
  }

  onAddMovieBtnClick() {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '400px',
      data: {
        action: ACTION_ADD,
        movieId: 0
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.pageNo = 0;
        this.getAllMovies();
      }
    });
  }

  onDeleteMovieBtnClicked(id) {
    if (confirm("Are you sure you want to delete??")) {
      this.movieService.deleteMovie(id).subscribe(
        resp => {
          if (resp.errCode == ERR_CODE_SUCCESS) {
            this.pageNo = 0;
            this.getAllMovies();
          } else if (resp.errCode == ERR_CODE_NO_RECORD) {
            this.isNoRecordFound = true;
            this.uiService.showSnackbar(resp.message);
          } else if (resp.errCode == ERR_CODE_ERROR) {
            this.uiService.showSnackbar(resp.message);
          }
        },
        err => {
          this.uiService.showSnackbar(API_ERR_MESSAGE);
        });
    }
  }

  onEditMovieBtnClicked(movieId) {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '400px',
      data: {
        action: ACTION_EDIT,
        movieId: movieId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.pageNo = 0;
        this.getAllMovies();
      }
    });
  }

  onConfigureMovieDateTimeSlotBtnClicked(movieId) {
    this.router.navigate([`/movie-management/date-time-slot/${movieId}`]);
  }

}
