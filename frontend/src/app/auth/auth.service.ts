import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  get getApiUrl() {
    return this.apiUrl;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  signup(user: any): Observable<any> {
    console.log(user);
    return this.http.post(`${this.apiUrl}/inscription`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/connexion`, credentials).pipe(
      tap(response => {
        this.storageService.setItem('access_token', response.accessToken);
        this.router.navigate(['/home']);
        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.router.navigate(['user-profile/' + res.msg._id]);
        // });
      }),
      catchError( error => {
        let errorMessage = {};
        if (error.status === HttpStatusCode.Unauthorized) { // user not found in api
          errorMessage = { newUser: true, msg: 'Utilisateur introuvable.' };
        } else if (error.status === HttpStatusCode.BadRequest) { // user found in api but bad pass
          errorMessage = { msg: 'Mauvais mot de passe' };
        } else {
          errorMessage = { msg: 'Une erreur inattendue est sruvenue. Réessayez plus tard.' };
        }
        return throwError(() => errorMessage);
      })
    );
  }

  getToken(): string {
    return this.storageService.getItem('access_token')!;
  }

  isLoggedIn(): boolean {
    return this.storageService.getItem('access_token') !== null || false;
    // return !this.jwtHelperService.isTokenExpired(token);
  }

  logout() {
    this.storageService.removeItem('access_token');
  }
}
