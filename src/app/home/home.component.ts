import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading=false;
  users:User[];

  constructor(private userService:UserService) {

   }

  ngOnInit(): void {

    this.loading=true;
    this.userService.getAll().pipe(first()).subscribe(
      data=>{
       this.loading=false;
       this.users=data;
      },
      err=>{
        console.log(err);
      }
    );

  }

}
