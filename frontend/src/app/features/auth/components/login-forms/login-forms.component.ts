import { AuthService } from '../../auth.service';
import { AuthDto, LoginCredentials } from '../../auth.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { ButtonComponent } from '@shared/components/button';
import { InputComponent } from '@shared/components/input';
import { Component, EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  standalone: true, 
  providers: [AuthService],
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
  user: AuthDto | null | undefined;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;  
    this.authService.currentUser$.subscribe(user => this.user = user);
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

