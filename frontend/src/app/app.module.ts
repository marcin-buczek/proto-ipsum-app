import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { jwtInterceptorProvider, errorInterceptorProvider } from './auth/auth-config.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClient,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['http://localhost:4200/connexion']
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    jwtInterceptorProvider,
    errorInterceptorProvider,
    AuthService,
    AuthGuard,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
