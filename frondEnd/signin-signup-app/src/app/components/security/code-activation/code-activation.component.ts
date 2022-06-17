import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { SpaceValidator } from '../space-validator';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.css']
})
export class CodeActivationComponent implements OnInit {

  formParentGroup!: UntypedFormGroup;

  email: string ="";

  constructor(private formChildGroup: UntypedFormBuilder,private authenticationService: AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem("emailActive");
    this.myLoginForm();
  }


  myLoginForm(){
    this.formParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        code: new UntypedFormControl('',[Validators.required,
                                  SpaceValidator.onlyContainSpace])
      })
    })
  }

  get code(){
    return this.formParentGroup.get('user.code')
  }

  done(){
    if(this.formParentGroup.invalid){
       this.formParentGroup.markAllAsTouched();
       return;
    }

    this.authenticationService.activeAccount(
      this.email,
      this.formParentGroup.controls['user'].value.code
    ).subscribe({
      next: response=>{
        if(response.result == 1){
           sessionStorage.removeItem("emailActive")
           this.router.navigateByUrl('/login')
        }else{
          alert("Invalid Code")
        }
      }
    })


  }




}
