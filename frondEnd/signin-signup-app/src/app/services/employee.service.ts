import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8080";



  constructor(private http: HttpClient) { }


  // getAllEmployess(): Observable<Employee[]> {
  //   let head = new HttpHeaders({
  //     Authorization: sessionStorage.getItem('token').toString()
  //   })
  //   alert(sessionStorage.getItem('token'))
  //    return this.http.get<GetResponse>(`${this.baseUrl}/api/v1/employees`,{headers: head}).pipe(
  //      map(
  //        response =>{
  //           return response.employeeDTOS
  //        })
  //    );
  // }


  // http://localhost:8080/api/v1/employees/all?pageNumber={value}&pageSize={value}
  getallEmployess(pageNumber:number, pageSize:number): Observable<Employee[]> {

     return this.http.get<GetResponse>(`${this.baseUrl}/api/v1/employees/all?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
       map(
         response =>{
            return response.employeeDTOS
         })
     );
  }


  // http://localhost:8080/api/v1/employees/search?word={value}&pageNumber={value}&pageSize={value}
  searchByKeyword(word:string, pageNumber:number, pageSize:number): Observable<Employee[]> {

    return this.http.get<GetResponse>(`${this.baseUrl}/api/v1/employees/search?word=${word}&pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
      map(
        response =>{
           return response.employeeDTOS
        })
    );
 }



}



interface GetResponse {
  employeeDTOS:Employee[];
}
