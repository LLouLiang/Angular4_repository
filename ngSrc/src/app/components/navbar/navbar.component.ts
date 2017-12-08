import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router,private authService : AuthenticateService) { }
  user: Object;
  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
  isLoggedIn(){
    let token = localStorage.getItem('id_token');
    if(token == undefined){
      return false;
    }else if(token != null){
      return true;
    }
  }
  roleAuthorized(){
    let role = localStorage.getItem('userRole');
    if(role == "patient"){
      return false;
    }else{
      return true;
    }
  }
}
