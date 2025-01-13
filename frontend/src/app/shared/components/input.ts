import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col gap-1">
      <label 
        *ngIf="label"
        [for]="id" 
        [class]="getLabelClasses()">
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </label>

      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [required]="required"
        [disabled]="disabled"
        [class]="getInputClasses()"
        (input)="onInput($event)"
        (blur)="onBlur($event)"
      />

      <small 
        *ngIf="error" 
        class="text-red-500 text-sm mt-1">
        {{ error }}
      </small>
    </div>
  `
})
export class InputComponent {
  @Input() id = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() label = '';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() error = '';
  @Input() variant: 'primary' | 'secondary' = 'primary';

  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<FocusEvent>();

  private variantClasses = {
    primary: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    secondary: 'border-gray-200 focus:border-gray-500 focus:ring-gray-500'
  };

  getInputClasses(): string {
    const baseClasses = 'block w-full px-4 py-2 rounded-md border ring-0 focus:ring-2 focus:ring-opacity-50 transition-colors duration-200';
    const stateClasses = this.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';
    const variantClass = this.variantClasses[this.variant];
    const errorClass = this.error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

    return `${baseClasses} ${stateClasses} ${variantClass} ${errorClass}`;
  }

  getLabelClasses(): string {
    return `text-sm font-medium text-gray-700`;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  onBlur(event: FocusEvent): void {
    this.blur.emit(event);
  }
}