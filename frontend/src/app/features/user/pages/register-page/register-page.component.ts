import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterFormsComponent } from '@features/user/components/register-forms/register-forms.component';
import { BannerComponent } from '@features/user/components/banner/banner.component';
import { UserService } from '@features/user/user.service';
import { RegisterCredentials } from '@features/user/user.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  standalone: true,
  providers: [UserService],
  imports: [
    CommonModule,
    FormsModule,
    RegisterFormsComponent,
    BannerComponent
  ]
})

export class RegisterPageComponent {
  constructor(private UserService: UserService) {}
  message: string = '';
  
  handleRegister(credentials: RegisterCredentials): void {
    this.UserService.register(credentials).subscribe({
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