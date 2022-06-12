import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private baseURL = "http://localhost:8080";

  constructor(private http: HttpClient,private cookie: CookieService) { }

  // http://localhost:8080/signin
  executeAuthentication(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.baseURL}/signin`, { email, password }).pipe(
     map(response =>{
      sessionStorage.setItem("email",response.email)
      sessionStorage.setItem("token",`Bearer ${response.token}`)
       this.cookie.set("email",response.email)
       this.cookie.set("token",`Bearer ${response.token}`)
       return response
     })
   );
  }


  // http://localhost:8080/signup
  createUser(email:string, password:string):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/signup`,{email,password}).pipe(
      map(response => response)
    )
  }

  userActive(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.baseURL}/active`, { email, password }).pipe(
     map(response =>{
      return response;
     } )
   );
 }

 activeAccount(email:string, code:string):Observable<any>{
  return this.http.post<any>(`${this.baseURL}/activated`, {email, code}).pipe(
    map(response => response)
  );
}


isLogin(){
    return !(sessionStorage.getItem('email') == null || sessionStorage.getItem('token') == null);
 }

 logout(){
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('token');
  this.cookie.delete("email");
  this.cookie.delete("token");
 }

 getEmail(){
  return sessionStorage.getItem("email");
}



getToken(){
    return sessionStorage.getItem("token")
}



}
