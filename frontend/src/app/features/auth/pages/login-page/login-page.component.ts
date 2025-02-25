import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginFormsComponent } from '@features/auth/components/login-forms/login-forms.component';
import { LoginPayload } from '@features/auth/auth.model';
import { AuthBannerComponent } from '@features/auth/components/banner/banner.component';
import { AuthService } from '@features/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  standalone: true,
  providers: [AuthService],
  imports: [
    CommonModule,
    FormsModule,
    LoginFormsComponent,
    AuthBannerComponent
  ]
})

export class LoginPageComponent {
  
  onLogin(credentials: LoginPayload): void {
    console.log('Connexion en cours...', credentials);
  }
}