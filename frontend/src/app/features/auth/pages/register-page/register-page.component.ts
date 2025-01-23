import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthBannerComponent } from '@features/auth/components/auth-banner/auth-banner.component';
import { RegisterFormsComponent } from '@features/auth/components/register-forms/register-forms.component';
import { RegisterCredentials } from '@features/auth/models/auth.model';
import { AuthService } from '@features/auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RegisterFormsComponent,
    AuthBannerComponent
  ]
})

export class RegisterPageComponent {
  constructor(private authService: AuthService) {}
  message: string = '';
  
  handleRegister(credentials: RegisterCredentials): void {
    this.authService.register(credentials).subscribe({
      next: (response) => {
        this.message = 'Inscription réussie !';
        console.log('Réponse:', response);
      },
      error: (error) => {
        this.message = "Erreur d'inscription";
        console.error('Erreur:', error);
      }
    });
  }
}