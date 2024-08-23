import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation'
import { ReservationService } from '../reservation/reservation.service'
import {Observable } from 'rxjs'

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations:Reservation[]=[];
  constructor(private reservationService:ReservationService) { }

  ngOnInit(): void {
   this.reservationService.getReservations().subscribe(reservations=> 
      { this.reservations = reservations
      })
      ;

      // this.reservations =   this.reservationService.getReservations()
  }

  deleteReservation(id:string){
    //this.reservationService.deleteReservation(id);

    this.reservationService.deleteReservation(id).subscribe(()=>{
      console.log("Delete request got processed");
    });
  }

}
