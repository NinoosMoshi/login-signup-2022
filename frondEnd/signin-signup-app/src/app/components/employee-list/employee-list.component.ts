import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

   employess: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployess();
  }



  getEmployess(){
      this.employeeService.getAllEmployess().subscribe(data =>{
        this.employess = data;
     })
  }







}
