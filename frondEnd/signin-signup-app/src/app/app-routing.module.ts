import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoginComponent } from './components/security/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/security/signup/signup.component';

// http://localhost:4200
const routes: Routes = [
  {path:'login', component:LoginComponent},                     // http://localhost:4200/login
  {path:'signup', component:SignupComponent},                   // http://localhost:4200/signup
  {path:'employess', component: EmployeeListComponent},         // http://localhost:4200/employess
  {path:'', redirectTo:'/employess',pathMatch:'full'},          // http://localhost:4200/
  {path:'**', redirectTo:'/employess',pathMatch:'full'},        // http://localhost:4200/jsdkljkd
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
