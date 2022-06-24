import { HttpInterceptorBasicAuthService } from './services/security/interceptor/http-interceptor-basic-auth.service';
import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
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
import { SearchComponent } from './components/search/search.component';
import { CookieService } from 'ngx-cookie-service';
import { CodeActivationComponent } from './components/security/code-activation/code-activation.component';
import { ResetPasswordComponent } from './components/security/reset-password/reset-password.component';
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    CodeActivationComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgbPaginationModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '846938154013-of6iv1dnuv4q0mdefq3cncfqovlj9ug0.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('5152371748174718')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    EmployeeService,
    {provide: HTTP_INTERCEPTORS, useClass:HttpInterceptorBasicAuthService,multi:true},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
