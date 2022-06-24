import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {



  constructor(private employeeService: EmployeeService ,
             private authenticationService:AuthenticationService,
             private router:Router) { }

  ngOnInit(): void {
  }


   isAuthenticatedUser(){
     return this.authenticationService.isLogin();
   }


   isLogout(){
     this.router.navigateByUrl("/login")
     return this.authenticationService.logout();
   }


   doSearch(key: string){
    this.router.navigateByUrl(`/employess/${key}`)
   }




}
