import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { SpaceValidator } from '../space-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  formParentGroup: FormGroup;
  formParentGroupReset: FormGroup;
  enableFrom: boolean = true;

  constructor(private formChildGroup: FormBuilder,private authenticationService: AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.mySignupForm();
    this.mySignupFormReset();
  }

  mySignupForm(){
    this.formParentGroup = this.formChildGroup.group({
      user:this.formChildGroup.group({
        email: new FormControl('',[
          Validators.required,
          SpaceValidator.onlyContainSpace,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ])
      })
    })
  }

  mySignupFormReset(){
    this.formParentGroupReset = this.formChildGroup.group({
      newUser: this.formChildGroup.group({
        code: new FormControl('',[Validators.required,
                                  SpaceValidator.onlyContainSpace]),
        password: new FormControl('', [Validators.required])
      })

    })

  }


  get code(){
    return this.formParentGroupReset.get('newUser.code')
  }

  get password(){
    return this.formParentGroupReset.get('newUser.password')
  }


  get email(){
    return this.formParentGroup.get('user.email')
  }


  done(){
    if(this.formParentGroup.invalid){
      this.formParentGroup.markAllAsTouched();
      return
   }
  }


}
