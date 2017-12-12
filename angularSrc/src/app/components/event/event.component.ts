import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  title:string;
  author:string;
  // Careful for date formate is MM-DD-YYYY
  date:string;
  place:string;
  content:string;
  constructor(private router:Router, private authService:AuthenticateService, private validateService: ValidateService) { }

  ngOnInit() {
  }
  onEventSubmit(){
    let newEvent = {
      title : this.title,
      author :this.author,
      // Careful for date formate is MM-DD-YYYY
      date:this.date,
      place:this.place,
      content:this.content
    };
    if(!this.validateService.validateEvent(newEvent)){
      console.log("please file in all fields");
    }else{
      this.authService.publishEvent(newEvent).subscribe(data => {
        if(data.success){
          console.log("worked");
          this.router.navigate(['/event']);
        }else{
          console.log("failed to publish");
        }
      });
    }
  }
}
