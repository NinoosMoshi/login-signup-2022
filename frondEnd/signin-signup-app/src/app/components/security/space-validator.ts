import { UntypedFormControl, ValidationErrors } from '@angular/forms';

export class SpaceValidator {

  static onlyContainSpace(control: UntypedFormControl): ValidationErrors | null{
    if(control.value !=null && control.value.trim().length === 0){
      return {'noSpace': true}
    }
    else{
      return null;
    }
 }


}
