import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';
import { environment } from 'src/environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationservice: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const user=this.authenticationservice.userValue;
    const isLoggedIn= user && user.authdata;
    const isApiUrl=request.url.startsWith(environment.apiUrl);

    if(isLoggedIn && isApiUrl){
      request=request.clone({
        setHeaders:{Authorization: `Basic ${user.authdata}`}

      });
    }
   
    return next.handle(request);
  }
}
