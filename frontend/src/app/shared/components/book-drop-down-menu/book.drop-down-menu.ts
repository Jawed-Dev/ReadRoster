import { CommonModule } from "@angular/common";
import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-drop-down-menu',
    templateUrl: './drop-down-menu.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ]
})


export class DropDownMenuComponent  {

    constructor() { }
    
    @Input() itemId: string | undefined;
    @Input() itemName: string | undefined;
    @Output() itemSelected = new EventEmitter<number>();

    isMenuOpen: boolean = false;

    menuOptions = [
        { id: 1, label: 'Favori', checked: false },
        { id: 2, label: 'Lu', checked: false },
        { id: 3, label: 'A lire', checked: false },
        { id: 4, label: 'En cours de l', checked: false }
    ];

    @HostListener('document:click', ['$event'])
    clickOutside(event: Event): void {
        if (this.isMenuOpen) {
            const target = event.target as HTMLElement;
            if (!target.closest('app-drop-down-menu')) {
                this.isMenuOpen = false;
                event.stopPropagation();
            }
        }
        
    }

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
        //alert(this.itemId);
    }

    onMenuClick(event: Event): void {
        event.stopPropagation();
    }

    closeMenu(): void {
        this.isMenuOpen = false;
    }

}