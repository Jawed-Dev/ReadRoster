import { RegisterCredentials } from '../../../auth/auth.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button';
import { InputComponent } from '@shared/components/input';
import { Component, EventEmitter, Input, Output } from '@angular/core'; 

@Component({
  selector: 'app-register-forms',
  templateUrl: './register-forms.component.html',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent
  ]
})

export class RegisterFormsComponent {
  @Output() submitRegister = new EventEmitter<RegisterCredentials>(); 
  
  credentials: RegisterCredentials = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  @Input() message: string = '';  

  onSubmit(): void {
    this.submitRegister.emit(this.credentials);
  }
}

