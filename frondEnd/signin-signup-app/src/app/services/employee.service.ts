import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8080/api/v1/employees";

  constructor(private http: HttpClient) { }



  getAllEmployess(): Observable<Employee[]> {
     return this.http.get<GetResponse>(this.baseUrl).pipe(
       map(response => response.employeeDTOS)
     );
  }


}



interface GetResponse {
  employeeDTOS:Employee[];
}
