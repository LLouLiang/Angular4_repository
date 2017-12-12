import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : string;
  email : string;
  password : string;
  role : string;
  constructor( private router: Router, private validateservice : ValidateService, private authService : AuthenticateService) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = {
      name : this.name,
      email : this.email,
      password : this.password,
      role : 'owner'
    };
    if(!this.validateservice.validateRegister(user)){
      console.log("please fill in all fields !");
    }else{
      this.authService.registerUser(user).subscribe( data => {
        if(data.success){
          console.log(data.success);
          this.router.navigate(['/login']);
        }else{
          console.log(data.success);
          this.router.navigate(['/register']);
        }
      });
    }
    
  }
  
}
