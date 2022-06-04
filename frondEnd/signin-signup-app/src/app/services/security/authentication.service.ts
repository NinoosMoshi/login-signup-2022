import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private baseURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  executeAuthentication(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.baseURL}/signin`, { email, password }).pipe(
     map(response =>{
      return response;
     } )
   );
 }



}
