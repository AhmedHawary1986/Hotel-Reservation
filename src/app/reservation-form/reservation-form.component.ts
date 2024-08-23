import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators}  from '@angular/forms'
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service'
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm : FormGroup = new FormGroup({});
  constructor(private formBuilder:FormBuilder,
    private reservationService: ReservationService,
    private router:Router,
    private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.reservationForm= this.formBuilder.group({
      checkInDate :['',Validators.required],
      checkOutDate :['',Validators.required],
      guestName :['',Validators.required],
      guestEmail :['',[Validators.required,Validators.email]],
      roomNumber :['',Validators.required]
     }  
    )

    let reservationId = this.activatedRouter.snapshot.paramMap.get('id');
    if(reservationId)
    {
      this.reservationService.getReservation(reservationId).subscribe(selectedReservation=>{
        if(selectedReservation)
        {
          this.reservationForm.patchValue(selectedReservation);
        }
      });
     /* 
     let selectedReservation = this.reservationService.getReservation(reservationId)
     if(selectedReservation)
      {
        this.reservationForm.patchValue(selectedReservation);
      }*/
    }
  }

  onSubmit()
  {
    if(this.reservationForm.valid)
    {
      let reservation:Reservation = this.reservationForm.value;
      let reservationId = this.activatedRouter.snapshot.paramMap.get("id");
      if(reservationId)
      {
          //this.reservationService.updateReservation(reservationId,reservation);
          this.reservationService.updateReservation(reservationId,reservation).subscribe(()=>{
            console.log("Update request got processed")
          })
      }
      else
      {
         //this.reservationService.addReservation(reservation);
         this.reservationService.addReservation(reservation).subscribe(()=>{
          console.log("Insert request got processed")
         });
      }
      this.router.navigate(['/list']);
    }
  }

}
