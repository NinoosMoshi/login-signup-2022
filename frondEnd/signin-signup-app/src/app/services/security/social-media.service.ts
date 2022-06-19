import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private baseUrl = "http://localhost:8080/social";

  constructor(private http:HttpClient,private cookie: CookieService) { }

  loginWithGoogle(token:string):Observable<any>{
   return this.http.post<any>(`${this.baseUrl}/google`,{token}).pipe(
    map(response =>{
      sessionStorage.setItem("email",response.email)
      sessionStorage.setItem("token",`Bearer ${response.token}`)
       this.cookie.set("email",response.email)
       this.cookie.set("token",`Bearer ${response.token}`)
      return response
    })
   );
  }


  loginWithFacebook(token:string):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/facebook`,{token}).pipe(
     map(response =>{
      sessionStorage.setItem("email",response.email)
      sessionStorage.setItem("token",`Bearer ${response.token}`)
       this.cookie.set("email",response.email)
       this.cookie.set("token",`Bearer ${response.token}`)
      return response
     })
    );
   }



}
