import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticateService {
  authToken : any;
  user : any;
  
  constructor( private http: Http) { }
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/signup/Register', user, {headers : headers}).map( res => res.json());
  }
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/signup/Authenticate', user, {headers : headers}).map( res => res.json());
  }
  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    // Store user object as a string
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  getProfile(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:4000/signup/profile', {headers : headers}).map( res => res.json());
  }

  publishEvent(newEvent){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/signup/createEvent',newEvent, {headers : headers}).map( res => res.json());
  }

  getEvents(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/signup/allEvents', {headers : headers}).map( res => res.json());
  }

  getEventsByName(author){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/signup/events',author, {headers : headers}).map( res => res.json());
  
  }

  updateProfile(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.put('http://localhost:4000/signup/update',user, {headers : headers}).map( res => res.json());
  }

  updateEvent(event){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:4000/signup/updateevent',event, {headers : headers}).map( res => res.json());
  }

  createAppointment(appointment){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/signup/appointment',appointment, {headers : headers}).map( res => res.json());
  }

  getAppointments(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/signup/appointments', {headers : headers}).map( res => res.json());
  }

  getOnesAppointments(participant){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/signup/specificappointments',participant, {headers : headers}).map( res => res.json());
  }

  updateAppointment(appointment){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:4000/signup/updateAppointment',appointment, {headers : headers}).map( res => res.json());
  }


  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
