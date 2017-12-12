import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Object;
  constructor(private authService: AuthenticateService, private router: Router) { }

  ngOnInit() {
    this.authService.getEvents().subscribe(data => {
      this.events = data.event;
      console.log(this.events[0]);
    },err=>{
      console.log(err);
    });
  }
  onEditClick(event){
    console.log(event);
    this.router.navigate(['']);
  }
}
