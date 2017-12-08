import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateEvent(event){
    if(event.title == undefined || event.author == undefined || event.date == undefined || event.place == undefined || event.content == undefined){
      return false;
    }else{
      return true;
    }
  }
  
  validateEventUpd(event){
    if(event.title == undefined || event.date == undefined || event.place == undefined || event.content == undefined){
      return false;
    }else{
      return true;
    }
  }
  validateAppointment(appoints){
    if(appoints.subject == undefined || appoints.date == undefined || appoints.place == undefined || appoints.status == undefined || appoints.participant == undefined){
      return false;
    }else{
      return true;
    }
  }
}
