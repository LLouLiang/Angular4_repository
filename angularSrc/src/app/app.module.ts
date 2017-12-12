import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppointmentComponent } from './components/appointment/appointment.component'
import { ProfileComponent } from './components/profile/profile.component';
import { EventComponent } from './components/event/event.component';

// Services
import { ValidateService } from './services/validate.service';
import { AuthenticateService } from './services/authenticate.service';
import { PersonaleventComponent } from './components/personalevent/personalevent.component';
import { EditeventComponent } from './components/editevent/editevent.component';
import { AppointmentlistComponent } from './components/appointmentlist/appointmentlist.component';
import { AppointmentCustComponent } from './components/appointment-cust/appointment-cust.component';
import { AppointmentSuperComponent } from './components/appointment-super/appointment-super.component';

const appRoute = [
  { path:'', component:HomeComponent},
  { path:'register', component:RegisterComponent},
  { path:'login', component:LoginComponent},
  { path:'appointment', component:AppointmentComponent},
  { path:'profile', component:ProfileComponent},
  { path:'event', component:EventComponent},
  { path:'editevent', component:EditeventComponent},
  { path:'appointmentlist', component:AppointmentlistComponent},
  { path:'editappointment', component:AppointmentSuperComponent},
  { path:'createappointment', component:AppointmentCustComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AppointmentComponent,
    ProfileComponent,
    EventComponent,
    PersonaleventComponent,
    EditeventComponent,
    AppointmentlistComponent,
    AppointmentCustComponent,
    AppointmentSuperComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [ValidateService,AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
