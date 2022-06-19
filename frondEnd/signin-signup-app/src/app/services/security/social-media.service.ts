import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private baseUrl = "http://localhost:8080/social";

  constructor(private http:HttpClient) { }

  loginWithGoogle(token:string):Observable<any>{
   return this.http.post<any>(`${this.baseUrl}/google`,{token}).pipe(
    map(response => response)
   );
  }


  loginWithFacebook(token:string):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/facebook`,{token}).pipe(
     map(response => response)
    );
   }



}
