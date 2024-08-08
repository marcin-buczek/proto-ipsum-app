import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export function uniqueEmailValidator(http: HttpClient, apiUrl: string | null): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    console.log("control.value in uniqueEmailValidator",control.value)
    return http.post<{ isEmailUnique: boolean }>(`${apiUrl}/check-email`, { email: control.value }).pipe(
      map(response => (response.isEmailUnique ? null : { emailTaken: true })),
      catchError(() => of(null))
    );
  };
}
