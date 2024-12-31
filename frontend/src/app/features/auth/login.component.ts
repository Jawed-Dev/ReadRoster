import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginCredentials } from './auth.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

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
  isAuthenticated$: Observable<boolean>;  // Déclaration de la propriété

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;  // Initialisation dans le constructeur
  }

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

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.message = 'Déconnexion réussie';
      },
      error: () => {
        this.message = 'Erreur lors de la déconnexion';
      }
    });
  }

  
}