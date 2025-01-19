import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      class="p-2 rounded transition-colors duration-200 mt-2 w-[300px]"
      [ngClass]="getButtonClasses()"
      (click)="onClick($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})

export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  private variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  getButtonClasses(): string {
    const baseClasses = this.variantClasses[this.variant];
    return `${baseClasses} ${this.disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}