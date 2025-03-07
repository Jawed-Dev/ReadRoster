import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/user/pages/register-page/register-page.component';
import { DashboardPageComponent } from './features/books/pages/dashboard-page/dashboard-page.component';
import { AppRedirectGuard } from './app.gard';

export const routes: Routes = [
    { path: '', redirectTo: '/connexion', pathMatch: 'full' },
    { 
      path: 'connexion', 
      component: LoginPageComponent,
      canActivate: [AppRedirectGuard]  
    },
    { path: 'inscription', component: RegisterPageComponent },
    { path: 'dashboard', component: DashboardPageComponent }
];