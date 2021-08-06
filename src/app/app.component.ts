import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models';
import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-authentication-app';
  user: User;

  constructor(
    private authenticationservice: AuthenticationService,
    private router:Router
  ){
    this.authenticationservice.user.subscribe(data=>{this.user=data;})
  }


  logout(){
    this.authenticationservice.logout();
  }
}
