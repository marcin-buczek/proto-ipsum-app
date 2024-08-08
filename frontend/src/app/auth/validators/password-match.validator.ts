import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return passwordsMatchValidator(control);
}

function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const passwordControl = control?.root?.get('password');
  const confirmPasswordControl = control?.root?.get("confirm_password");

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  if(control === passwordControl && passwordControl.valid) {
    if(control.value !== confirmPasswordControl.value){
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      if (control.hasError('passwordMismatch')) {
        confirmPasswordControl.setErrors({ passwordMismatch: null });
      }
    }
    confirmPasswordControl.updateValueAndValidity();
    
  } else if(control === confirmPasswordControl){
    if(control.value !== passwordControl.value){
      return { passwordsMismatch: true };
    }
  }

  return null;
}