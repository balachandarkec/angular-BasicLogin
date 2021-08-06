import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading= false;
  submitted=false;
  returnUrl:string;
 error='';
  


  constructor(
    private authenticationservice: AuthenticationService,
    private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { 
     if(this.authenticationservice.userValue){
       this.router.navigate(['/']);
     }

  }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
    this.returnUrl=this.route.snapshot.queryParams['this.returnUrl']||'/';
    
  }


  get fc(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    if(this.loginForm.invalid){
      return;
    }
     this.loading=true;
     this.authenticationservice.login(this.fc.username.value,this.fc.password.value)
      .pipe(first()).subscribe(
        data=>{
          this.router.navigate([this.returnUrl]);
        },error=>{
          this.error=error;
          this.loading=false;
        }
      )
  }

}
