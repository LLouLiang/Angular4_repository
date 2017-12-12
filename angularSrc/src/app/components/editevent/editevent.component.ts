import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {
  updateevent : Event;

  title:string;
  date:string;
  place:string;
  content:string;
  constructor(private router:Router, private authService:AuthenticateService, private validateService:ValidateService) { 
  }

  ngOnInit() {
  }
  onEventUpdate(){
    
    this.updateevent = JSON.parse(localStorage.getItem('selected_event'));
    console.log(this.updateevent);
    if(this.title != undefined) this.updateevent.title = this.title;
    if(this.date != undefined) this.updateevent.date = this.date;
    if(this.place != undefined) this.updateevent.place = this.place;
    if(this.content != undefined) this.updateevent.content = this.content;
    
    console.log(this.updateevent);
    this.authService.updateEvent(this.updateevent).subscribe(data => {
      if(data.success){
        console.log("works");
        this.router.navigate(['/event']);
      }
    });
  }
}
interface Event{
  title:string,
  date:string,
  place:string,
  content:string
}
