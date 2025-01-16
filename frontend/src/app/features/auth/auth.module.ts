import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [   
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    LoginPageComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }