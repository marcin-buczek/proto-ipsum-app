import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { EmailRegx, StrongPasswordRegx } from '../../../common/constants/regex.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  title = 'Connexion';

  loginForm: FormGroup;
  showPassword: boolean = false;
  validForm = false;

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', { 
        validators: [ 
          Validators.required, 
          Validators.pattern(EmailRegx)
        ], 
        updateOn: 'change'
      }),
      password: new FormControl('', { 
        validators: [ 
          Validators.required, 
          Validators.minLength(6), 
          Validators.maxLength(26),
          Validators.pattern(StrongPasswordRegx)
        ], 
        updateOn: 'change'
      }),
    });
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit() {
    this.emailInput.nativeElement.focus();
  }

  get email() {
    return this.loginForm.get('email') as AbstractControl;
  }

  get password() {
    return this.loginForm.get('password') as AbstractControl;
  }

  onSubmit() {
    this.validForm = false;

    if(!this.loginForm.valid){
      // this.getFormValidationErrors();
      
    } else {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password })
      .subscribe({
        error: (err) => {
          console.log(err);
          this.validForm = true;
          if(err.newUser){
            this.email.setErrors({ unique: true });
          } else {
            this.password.setErrors({ mismatch: true });
          }
        }
      });
    }
    console.log(this.loginForm.errors);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordInput.nativeElement.focus();
  }

  // getFormValidationErrors() {
  //   Object.keys(this.loginForm.controls).forEach(key => {
  //     const controlErrors = this.loginForm.get(key)?.errors;
  //     if (controlErrors != null) {
  //       this.formErrors.error = true;
  //       Object.keys(controlErrors).forEach(keyError => {
  //         let placeholder = '';
  //         switch (key) {
  //           case 'email':
  //             placeholder = this.emailInput.nativeElement.placeholder;
  //             this.formErrors.email = this.getErrorMessage(controlErrors, keyError, placeholder);
  //             break;
  //           case 'password':
  //             placeholder = this.passwordInput.nativeElement.placeholder;
  //             this.formErrors.password = this.getErrorMessage(controlErrors, keyError, placeholder);
  //             break;
  //         }
  //       });
  //     }
  //   });
  // }

  // getErrorMessage(controlErrors: ValidationErrors, keyError: string, placeholder: string): {new: boolean, strong: string, main: string} {
  //   let message = {new: false, strong: placeholder, main: ''};
  //   switch (keyError) {
  //     case 'required':
  //       message.main =  ' obligatoire.';
  //       break;
  //     case 'email':
  //       message.main = ' format invalide. exemple@email.com';
  //       break;
  //     case 'minlength':
  //       message.main = ` doit contenir minimum ${controlErrors['minlength'].requiredLength} caractères.`;
  //       break;
  //     case 'maxlength':
  //       message.main = ` doit contenir minimum ${controlErrors['maxlength'].requiredLength} caractères.`;
  //       break;
  //   }
  //   return message;
  // }
}
