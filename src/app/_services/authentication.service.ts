import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   
  public user : Observable<User>;
  private userSubject:BehaviorSubject<User>;

  
  

  constructor(
    private router:Router,
  private httpClient:HttpClient
  ) {
    this.userSubject=new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

   }



   public get userValue():User{
     return this.userSubject.value;
   }



   login(username:string,password:string){
     return this.httpClient.post<any>()
   }
}
