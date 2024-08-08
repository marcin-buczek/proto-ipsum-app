import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FlowbiteService } from '../../../services/flowbite.service';
import { DirectiveModule }  from '../../directives/format-input.directive';
import { passwordsMatch }  from '../../validators/password-match.validator';
import { UsernameRegx, EmailRegx, StrongPasswordRegx } from '../../../common/constants/regex.constants';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, DirectiveModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  title = 'Inscription';

  signupForm!: FormGroup; 
  showPassword: boolean = false;
  formErrors = {
    error: false,
    username: { strong: '', main: '', ex: '' }, 
    email: { strong: '', main: '', ex: '' }, 
    password: { strong: '', main: '', ex: '' },
    confirm_password: { strong: '', main: '' },
    confirm_terms: { strong: '', main: '' }
  };

  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flowbiteService: FlowbiteService
  ) {
    this.signupForm = new FormGroup({
      username: new FormControl('', { 
        validators: [ 
          Validators.required,
          Validators.pattern(UsernameRegx)
        ], 
        updateOn: 'change' 
      }),
      email:new FormControl('', { 
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
          Validators.pattern(StrongPasswordRegx),
          passwordsMatch 
        ], updateOn: 'change' 
      }),
      confirm_password: new FormControl('', { 
        validators: [ 
          Validators.required, 
          Validators.minLength(6), 
          passwordsMatch 
        ], updateOn: 'change' 
      }),
      confirm_terms: new FormControl(false, { 
        validators: [ 
          Validators.requiredTrue 
        ], 
        updateOn: 'change' 
      })
    });
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    // this.signupForm.get('email')?.valueChanges.subscribe(() => {
    //   const emailControl = this.signupForm.get('email');
    //   if (emailControl?.invalid && emailControl?.touched) {}
    // });
  }

  ngAfterViewInit() {
    // console.log(this.username);
    this.usernameInput.nativeElement.focus();
  }

  get username() {
    return this.signupForm.get('username') as AbstractControl;
  }

  get email() {
    return this.signupForm.get('email') as AbstractControl;
  }

  get password() {
    return this.signupForm.get('password') as AbstractControl;
  }

  get confirmPassword() {
    return this.signupForm.get('confirm_password') as AbstractControl;
  }

  get confirmTerms() {
    return this.signupForm.get('confirm_terms') as AbstractControl;
  }

  onSubmit(): void {
    this.formErrors = {
      error: false,
      username: { strong: '', main: '', ex: 'Jean Dupont' }, 
      email: { strong: '', main: '', ex: 'adresse@email.com' }, 
      password: { strong: '', main: '', ex: '' },
      confirm_password: { strong: '', main: '' },
      confirm_terms: { strong: '', main: '' }
    };

    console.log("onSubmit this.confirmTerms",this.confirmTerms);
    
    if(!this.signupForm.valid){
      this.getFormValidationErrors();

    } else {
      this.authService.signup(this.signupForm.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          // this.router.navigate(['/connexion']);
        },
        error: (err) => console.log(err)
      });
    }
    
    console.log("end of signup onSubmit function : formErrors", this.formErrors)
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getFormValidationErrors() {
    Object.keys(this.signupForm.controls).forEach(key => {
      const controlErrors = this.signupForm.get(key)?.errors;
      console.log("key",key);
      console.log("this.signupForm.get(key)",this.signupForm.get(key));
      console.log("controlErrors",controlErrors);
      if (controlErrors != null) {
        this.formErrors.error = true;
        Object.keys(controlErrors).forEach(keyError => {
          let placeholder = '';
          let errorMessages;
          switch (key) {
            case 'username':
              placeholder = this.usernameInput.nativeElement.placeholder;
              errorMessages = this.getErrorMessage(controlErrors, keyError, placeholder);
              this.formErrors.username.strong = errorMessages.strong;
              this.formErrors.username.main = errorMessages.main;
              break;
            case 'email':
              placeholder = this.emailInput.nativeElement.placeholder;
              errorMessages = this.getErrorMessage(controlErrors, keyError, placeholder);
              this.formErrors.email.strong = errorMessages.strong;
              this.formErrors.email.main = errorMessages.main;
              break;
            case 'password':
              placeholder = this.passwordInput.nativeElement.placeholder;
              errorMessages = this.getErrorMessage(controlErrors, keyError, placeholder);
              this.formErrors.password.strong = errorMessages.strong;
              this.formErrors.password.main = errorMessages.main;
              break;
            case 'confirm_password':
              placeholder = this.confirmPasswordInput.nativeElement.placeholder;
              this.formErrors.confirm_password = this.getErrorMessage(controlErrors, keyError, placeholder);
              break;
            case 'confirm_terms':
              this.formErrors.confirm_terms = { strong: 'Termes et Conditions', main: 'Veuillez accepter les ' };
              break;      
          }
        });
      }
    });
  }

  getErrorMessage(controlErrors: ValidationErrors, keyError: string, placeholder: string): {strong: string, main: string} {
    let message = {strong: placeholder, main: ''};
    switch (keyError) {
      case 'required':
        message.main =  ' obligatoire.';
        break;
      case 'pattern':
        message.main =  ' invalide.';
        break;
      case 'email':
        message.main = ' format invalide. exemple@email.com';
        break;
      case 'minlength':
        message.main = ` doit contenir minimum ${controlErrors['minlength'].requiredLength} caractères.`;
        break;
      case 'maxlength':
        message.main = ` doit contenir minimum ${controlErrors['maxlength'].requiredLength} caractères.`;
        break;
      case 'passwordsMismatch':
        message.main = ` ne correspond pas.`;
        break;
    }
    return message;
  }
}
