import { Component, OnInit } from '@angular/core';
import { BookingService } from './services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { ERR_CODE_SUCCESS, ERR_CODE_NO_RECORD, ERR_CODE_ERROR, API_ERR_MESSAGE } from '../app.constant';
import { MatTableDataSource } from '@angular/material/table';
import { UiService } from '../services/ui.service';
import { Movie } from '../movies/models/movie';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  movie: Movie = null;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.getMovieDetailsByMovieId();
  }

  getMovieDetailsByMovieId() {
    this.bookingService.getMovieDatesAndTimeSlotByMovieId(this.route.snapshot.params['movieId']).subscribe(
      resp => {
        if (resp.errCode == ERR_CODE_SUCCESS) {
          this.movie = resp.data;
          // this.dataSource = new MatTableDataSource(resp.data);
        } else if (resp.errCode == ERR_CODE_NO_RECORD) {
          // if (this.pageNo == 0) {
          //   this.isNoRecordFound = true;
          // }
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
