import { AuthService } from '@features/auth/auth.service';
import { AuthDto, LoginPayload } from '@features/auth/auth.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button';
import { InputComponent } from '@shared/components/input';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  @Output() submitLogin = new EventEmitter<LoginPayload>(); 
  @Input() message: string = '';
  credentials: LoginPayload = {
    email: '',
    password: ''
  };
  
  onSubmitConnexion(): void {
    this.submitLogin.emit(this.credentials);
  }

  // onSubmitConnexion(): void {
  //   this.authService.login(this.credentials).subscribe({
  //     next: (response) => {
  //       this.message = 'Connexion réussie !';
  //       this.submitLogin.emit(this.credentials); 
  //       console.log('Réponse:', response);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: (error) => {
  //       this.message = 'Erreur de connexion';
  //       console.error('Erreur:', error);
  //     }
  //   });
  // }

  // onLogout(): void {
  //   this.authService.logout().subscribe({
  //     next: () => {
  //       this.message = 'Déconnexion réussie';
  //     },
  //     error: () => {
  //       this.message = 'Erreur lors de la déconnexion';
  //     }
  //   });
  // } 
}

