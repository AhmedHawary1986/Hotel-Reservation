import { Injectable } from '@angular/core';
import { Reservation} from '../models/reservation'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations:Reservation[]=[];
  
  private apiURL:string = 'http://localhost:3001'

  getReservations() : Observable<Reservation[]>
  {
    console.log(this.apiURL+"/reservations");
    return this.http.get<Reservation[]>(this.apiURL+"/reservations");
      // return this.reservations;
  }

  /*getReservations() : Reservation[]
  {
   
       return this.reservations;
  }*/

  getReservation(id:string) : Observable<Reservation>
  {
    console.log(this.apiURL+"reservation/"+id)
     return this.http.get<Reservation>(this.apiURL+"/reservation/"+id)
  }

  /*getReservation(id:string) : Reservation | undefined
  {
     return this.reservations.find(res=> res.id == id);
  }*/

  addReservation(reservation:Reservation) : Observable<void>
  {
    return this.http.post<void>(this.apiURL+"/reservation",reservation)
  }

  /*addReservation(reservation:Reservation)
  {
    reservation.id=Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
    console.log(this.reservations);
  }*/

  deleteReservation(id:string) : Observable<void>
  {
    return this.http.delete<void>(this.apiURL+"/reservation/"+id);
  }

  /*deleteReservation(id:string)
  {
    let reservationIndex = this.reservations.findIndex(res=> res.id === id);
     this.reservations.splice(reservationIndex,1);
     localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }*/
  
  updateReservation(reservationId:string,reservation:Reservation) : Observable<void>
  {
    return this.http.put<void>(this.apiURL+"/reservation/"+reservationId,reservation);
  }

  /*updateReservation(reservationId:string,reservation:Reservation)
  {
    let reservationIndex = this.reservations.findIndex(res=> res.id === reservationId);
    reservation.id=reservationId;
    this.reservations[reservationIndex]= reservation;
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }*/
  constructor(private http:HttpClient) { 
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations):[];
  }
}
