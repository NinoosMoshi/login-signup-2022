import { HttpInterceptorBasicAuthService } from './services/security/interceptor/http-interceptor-basic-auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeService } from './services/employee.service';
import { LoginComponent } from './components/security/login/login.component';
import { SignupComponent } from './components/security/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    EmployeeService,
    {provide: HTTP_INTERCEPTORS, useClass:HttpInterceptorBasicAuthService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
