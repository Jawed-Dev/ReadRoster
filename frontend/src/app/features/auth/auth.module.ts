import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login-forms/login.forms';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [   
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }