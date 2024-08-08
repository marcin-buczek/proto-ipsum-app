import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Directive, HostListener } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { uniqueEmailValidator } from '../validators/unique-email.validator';
import { AuthService } from '../auth.service';

@Directive({
  selector: '[appFormatUsernameInput]',
  standalone: true
})
export class FormatUsernameInputDirective {

  private spaceUsed = false;

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = this.formatText(input.value);
    this.spaceUsed = input.value.includes(' ');
  }

  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (event.key === ' ' && (this.spaceUsed || input.value.trim() === '')) {
      event.preventDefault();
    }
  }

  private formatText(value: string): string {
    const words = value.split(' ');
    if (words.length > 1) {
      const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
      const secondWord = words[1].toUpperCase();
      return `${firstWord} ${secondWord}`;
    } else {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  }

}

@Directive({
  selector: '[appUniqueEmail]',
  standalone: true,
  providers: [
    { 
      provide: NG_ASYNC_VALIDATORS, 
      useExisting: forwardRef(() => UniqueEmailDirective), 
      multi: true 
    }
  ]
})
export class UniqueEmailDirective implements AsyncValidator {
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (!control.value) { return of(null) }
    return of(control).pipe(
      switchMap(() => uniqueEmailValidator(this.http, this.authService.getApiUrl)(control)),
      map(result => { return result && result['emailTaken'] === true ? { exists: true } : null; })
    );
  }
}


@NgModule({
  exports: [
    FormatUsernameInputDirective, 
    UniqueEmailDirective
  ],
  imports: [
    CommonModule, 
    FormatUsernameInputDirective, 
    UniqueEmailDirective
  ],
})
export class DirectiveModule {}