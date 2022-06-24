import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

   employess: Employee[];

   page:number = 1;
   employessInEachPage:number = 3;
   totalEmployess:number = 8;

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( () => this.finishEmployee());
  }



  finishEmployee(){
    let searchResult = this.activatedRoute.snapshot.paramMap.has('key');
    if(searchResult){
      this.getOrdersByContainingKey();
    }
    else{
     this.getEmployess();
    }
  }

  getEmployess(){
    this.employeeService.getallEmployess(this.page - 1 ,this.employessInEachPage).subscribe(data =>{
      this.employess = data
    })
  }


  getOrdersByContainingKey() {
    let keyword = this.activatedRoute.snapshot.paramMap.get('key');
    this.employeeService.searchByKeyword(keyword,this.page - 1 ,this.employessInEachPage).subscribe(data =>{
      this.employess = data
    })

  }


  doing(){
    this.finishEmployee();
  }





}
