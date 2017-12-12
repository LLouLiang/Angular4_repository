import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;
  password:string;
  constructor(private router: Router, private validateService : ValidateService, private authService : AuthenticateService) { }

  ngOnInit() {
  }
  onUserLogging(){
    let user = {
      name : this.name,
      password : this.password
    };
    this.authService.authenticateUser(user).subscribe( data => {
      localStorage.setItem('userRole',data.user.role);
      if(data.success){
        this.authService.storeUserData(data.token,data.user);
        localStorage.setItem('user_name',user.name);
        this.router.navigate(['/profile']);
      }else{
        this.router.navigate(['/login']);
      }
    });
  }
  toRegistration(){
    this.router.navigate(['/register']);
  }

}
