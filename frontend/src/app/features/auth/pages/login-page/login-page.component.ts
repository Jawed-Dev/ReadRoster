import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginFormsComponent } from '@features/auth/components/login-forms/login-forms.component';
import { LoginCredentials } from '@features/auth/models/auth.model';
import { LoginBannerComponent } from '@features/auth/components/login-banner/login-banner.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoginFormsComponent,
    LoginBannerComponent
  ]
})

export class LoginPageComponent {
  
  onLogin(credentials: LoginCredentials): void {
    console.log('Connexion en cours...', credentials);
    // Ici vous pouvez ajouter votre logique de traitement
  }
}