import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/auth.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ButtonComponent } from '@shared/components/button';
import { InputComponent } from '@shared/components/input';
import { Component, EventEmitter, Output } from '@angular/core'; 

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent
  ]
})

export class LoginFormsComponent {
  @Output() submitLogin = new EventEmitter<LoginCredentials>(); 
  
  credentials: LoginCredentials = {
    email: '',
    password: ''
  };
  message: string = '';
  isAuthenticated$: Observable<boolean>; 
  
  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;  
  }

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.message = 'Connexion réussie !';
        this.submitLogin.emit(this.credentials); 
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

