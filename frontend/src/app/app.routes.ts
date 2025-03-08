import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/user/pages/register-page/register-page.component';
import { DashboardPageComponent } from './features/books/pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './app.require-auth-gard';
import { UnauthGuard } from './app.require-unauth-gard';

export const routes: Routes = [
    { path: '', redirectTo: '/connexion', pathMatch: 'full' },
    { 
      path: 'connexion', 
      component: LoginPageComponent,
      canActivate: [AuthGuard]  
    },
    { 
      path: 'inscription', 
      component: RegisterPageComponent,
      canActivate: [AuthGuard]  
    },
    { 
      path: 'dashboard', 
      component: DashboardPageComponent,
      canActivate: [UnauthGuard]  
    },

    {path: '**', redirectTo: '/connexion'}
];