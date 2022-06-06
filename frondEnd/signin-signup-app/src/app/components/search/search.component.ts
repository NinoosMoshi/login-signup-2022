import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }


   isAuthenticatedUser(){
     return this.authenticationService.isLogin();
   }

   isLogout(){
     this.router.navigateByUrl("/login")
     return this.authenticationService.logout();
   }




}
