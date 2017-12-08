import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.css']
})
export class AppointmentlistComponent implements OnInit {

  appointment: Object;
  constructor(private router:Router, private authService: AuthenticateService, private zone: NgZone) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    // patient 
    if(user.role == "owner"){
      this.authService.getAppointments().subscribe(data => {
        this.appointment = data.appoints;
      });
    }else if(user.role == "patient"){
      let participant = {
        participant : user.name
      };
      this.authService.getOnesAppointments(participant).subscribe(data=>{
        this.appointment = data.appoints;
      });
    }
  }
  isqualify(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user.role == "patient"){
      return false;
    }else if(user.role == "owner"){
      return true;
    }
  }
  btnClick(){
    this.router.navigate(['/createappointment']);
  }
  onArchivedClick(appointment){
     let appoint = {
      _id:appointment._id,
      status:"Archived"
    }
    this.zone.run(()=>{
      this.authService.updateAppointment(appoint).subscribe(data => {
        if(data.success){
          console.log("done");
          location.reload();
        }else{
          console.log("not done yet");
        }
      });
    });
  }
}