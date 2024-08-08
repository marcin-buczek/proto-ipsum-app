import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { 
      path: '', redirectTo: 'connexion', pathMatch: 'full' 
    },
    { 
      path: 'connexion',
      loadComponent: () => import('./auth/components/login/login.component').then((c) => c.LoginComponent),
    },
    { 
      path: 'inscription',
      loadComponent: () => import('./auth/components/signup/signup.component').then((c) => c.SignupComponent),
    },

    { 
      path: 'home', canActivate: [AuthGuard], 
      loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) , 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
