import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { SpaceValidator } from '../space-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formParentGroup : FormGroup;
  submitted = false;

  constructor(private formChildGroup: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.myLoginForm();
  }

  myLoginForm(){
    this.formParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        email: new FormControl('',[Validators.required,
                                  SpaceValidator.onlyContainSpace,
                                  Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') ]),
        password: new FormControl('', [Validators.required])
      })
    })
  }

  get email(){
    return this.formParentGroup.get('user.email')
  }

  get password(){
    return this.formParentGroup.get('user.password')
  }



login(){
  this.submitted = true;

        if(this.formParentGroup.invalid){
           this.formParentGroup.markAllAsTouched()
           return;
        }

        this.authenticationService.userActive(
          this.formParentGroup.controls['user'].value.email,
          this.formParentGroup.controls['user'].value.password
        ).subscribe({
          next: response =>{
            if(response.active == 1){
              this.authenticationService.executeAuthentication(this.formParentGroup.controls['user'].value.email,
              this.formParentGroup.controls['user'].value.password).subscribe({
              next: response =>{
                 this.router.navigateByUrl("/employess")
               }
              })
            }else if(response.active == 0){
              sessionStorage.setItem("emailActive",this.formParentGroup.controls['user'].value.email)
              this.router.navigateByUrl("/active")
            }else{
              alert("Invalid Credentails")
            }

          }
        })


      }



    }






