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
    
    @Input() itemGoogleId: string | undefined;
    @Input() itemGoogleName: string | undefined;
    @Output() statusChanged = new EventEmitter<{id: number, label: string, checked: boolean}[]>();

    isMenuOpen: boolean = false;

    bookStatus = [
        { id: 1, label: 'Favori', checked: false },
        { id: 2, label: 'Lu', checked: false },
        { id: 3, label: 'A lire', checked: false },
        { id: 4, label: 'En cours de lecture', checked: false }
    ];

    toggleStatus(statusId: number, event: Event): void {
        event.stopPropagation();
        const status = this.bookStatus.find(s => s.id === statusId);
        if (status) {
            status.checked = !status.checked;
            console.log(`Statut ${statusId} (${status.label}): ${status.checked}`);
            this.statusChanged.emit(this.bookStatus);
        }
    }


    @HostListener('document:click', ['$event'])
    clickOutside(event: Event): void {
        if (this.isMenuOpen) {
            const target = event.target as HTMLElement;
            if (!target.closest('app-drop-down-menu')) {
                this.closeMenu();
                event.stopPropagation();
            }
        }
        
    }

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    onMenuClick(event: Event): void {
        event.stopPropagation();
    }

    closeMenu(): void {
        this.isMenuOpen = false;
    }

    

}