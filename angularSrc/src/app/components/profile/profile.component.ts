import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  name:string;
  email:string;
  constructor(private router: Router, private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.user;
    },err => {
      console.log(err);
    });
  }
  
  onUpdateSubmit(){
    let newProfile = { 
      id: this.user._id,
      name:this.user.name,
      email:this.user.email
    };
    if(this.email != undefined) newProfile.email = this.email;
    if(this.name != undefined) newProfile.name = this.name;
    console.log(newProfile);
    this.authService.updateProfile(newProfile).subscribe(data => {
      if(data.success){
        console.log("updated");
        this.router.navigate(['/']);
      }else{
        console.log("bugs");
      }
    });
  }
}
interface User{
  _id:string,
  name:string,
  email:string
}
