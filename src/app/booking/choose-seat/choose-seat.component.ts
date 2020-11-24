import { Component, OnInit } from '@angular/core';
import { Seat } from '../model/seat';

@Component({
  selector: 'app-choose-seat',
  templateUrl: './choose-seat.component.html',
  styleUrls: ['./choose-seat.component.css']
})
export class ChooseSeatComponent implements OnInit {

  seatsPlatinum: Seat[] = [
    {
      seatNo: 1,
      isBooked: false
    },
    {
      seatNo: 2,
      isBooked: false
    },
    {
      seatNo: 3,
      isBooked: false
    },
    {
      seatNo: 4,
      isBooked: false
    },
    {
      seatNo: 5,
      isBooked: false
    },
    {
      seatNo: 6,
      isBooked: false
    }
  ];
  seatsGold: Seat[] = [
    {
      seatNo: 1,
      isBooked: false
    },
    {
      seatNo: 2,
      isBooked: false
    },
    {
      seatNo: 3,
      isBooked: false
    },
    {
      seatNo: 4,
      isBooked: false
    },
    {
      seatNo: 5,
      isBooked: false
    },
    {
      seatNo: 6,
      isBooked: false
    },
    {
      seatNo: 7,
      isBooked: false
    },
    {
      seatNo: 8,
      isBooked: false
    },
    {
      seatNo: 9,
      isBooked: false
    },
    {
      seatNo: 10,
      isBooked: false
    },
    {
      seatNo: 11,
      isBooked: false
    },
    {
      seatNo: 12,
      isBooked: false
    }
  ];
  seatsSilver: Seat[] = [
    {
      seatNo: 1,
      isBooked: false
    },
    {
      seatNo: 2,
      isBooked: false
    },
    {
      seatNo: 3,
      isBooked: false
    },
    {
      seatNo: 4,
      isBooked: false
    },
    {
      seatNo: 5,
      isBooked: false
    },
    {
      seatNo: 6,
      isBooked: false
    },
    {
      seatNo: 7,
      isBooked: false
    },
    {
      seatNo: 8,
      isBooked: false
    },
    {
      seatNo: 9,
      isBooked: false
    },
    {
      seatNo: 10,
      isBooked: false
    },
    {
      seatNo: 11,
      isBooked: false
    },
    {
      seatNo: 12,
      isBooked: false
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
