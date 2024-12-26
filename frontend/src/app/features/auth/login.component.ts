import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginCredentials } from './auth.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent {
  credentials: LoginCredentials = {
    email: '',
    password: ''
  };
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.message = 'Connexion réussie !';
        console.log('Réponse:', response);
      },
      error: (error) => {
        this.message = 'Erreur de connexion';
        console.error('Erreur:', error);
      }
    });
  }
}