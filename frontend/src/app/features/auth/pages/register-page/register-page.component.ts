import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthBannerComponent } from '@features/auth/components/auth-banner/auth-banner.component';
import { RegisterFormsComponent } from '@features/auth/components/register-forms/register-forms.component';

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
  // ...
}