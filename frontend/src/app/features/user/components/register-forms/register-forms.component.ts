import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button';
import { InputComponent } from '@shared/components/input';
import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { RegisterPayload } from '@features/user/user.model';
import { UserService } from '@features/user/user.service';

@Component({
  selector: 'app-register-forms',
  templateUrl: './register-forms.component.html',
  standalone: true, 
  providers: [UserService],
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent
  ]
})

export class RegisterFormsComponent {
  @Output() submitRegister = new EventEmitter<RegisterPayload>(); 
  
  credentials: RegisterPayload = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  @Input() message: string = '';  

  onSubmitInscription(): void {
    this.submitRegister.emit(this.credentials);
  }
}

