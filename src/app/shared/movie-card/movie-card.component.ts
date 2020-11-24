import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../model/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onBookTicketBtnClick() {
    this.router.navigate(['/booking/1']);
  }

}
