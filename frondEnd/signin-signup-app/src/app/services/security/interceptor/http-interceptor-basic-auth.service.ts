import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private auth:AuthenticationService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.auth.getEmail() && this.auth.getToken()){
       req = req.clone({
         setHeaders:{
           Authorization:this.auth.getToken()
         }
       })
    }

     return next.handle(req);
  }

}
