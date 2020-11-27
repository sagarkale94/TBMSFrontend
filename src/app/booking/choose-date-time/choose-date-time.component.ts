import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-date-time',
  templateUrl: './choose-date-time.component.html',
  styleUrls: ['./choose-date-time.component.css']
})
export class ChooseDateTimeComponent implements OnInit {

  selectedDate = new Date();
  minimumDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  selectedChange(date) {
    this.selectedDate = date;
  }

}
