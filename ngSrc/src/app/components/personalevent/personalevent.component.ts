import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personalevent',
  templateUrl: './personalevent.component.html',
  styleUrls: ['./personalevent.component.css']
})
export class PersonaleventComponent implements OnInit {
  author:string;
  events:Object;
  constructor(private authService: AuthenticateService, private router: Router) { 
  }

  ngOnInit() {
    this.author = localStorage.getItem('user_name');
    let event = {
      author : this.author
    };
    this.authService.getEventsByName(event).subscribe(data => {
      this.events = data.events;
    });
  }
  onEditClick(event){
    console.log(event);
    localStorage.setItem('selected_event',JSON.stringify(event));
    this.router.navigate(['/editevent']);
  }
}
