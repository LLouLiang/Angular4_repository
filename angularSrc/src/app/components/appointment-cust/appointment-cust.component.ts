import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-appointment-cust',
  templateUrl: './appointment-cust.component.html',
  styleUrls: ['./appointment-cust.component.css']
})
export class AppointmentCustComponent implements OnInit {

  subject:string;
  date:string;
  place:string;
  name:string;
  status:string;
  constructor( private router: Router, private authService: AuthenticateService, private validateService: ValidateService) { }

  ngOnInit() {
  }
  onAppointmentSubmit(){
    let appointment = {
      subject:this.subject,
      date:this.date,
      place:this.place,
      participant:this.name,
      status:this.status
    }
    if(!this.validateService.validateAppointment(appointment)){
      console.log("please fill in all fields");
    }else{
      this.authService.createAppointment(appointment).subscribe(data => {
        if(data.success){
          console.log("success");
          this.router.navigate(['/appointmentlist']);
        }else{
          console.log("failed");
        }
      });
    }
  }
}
