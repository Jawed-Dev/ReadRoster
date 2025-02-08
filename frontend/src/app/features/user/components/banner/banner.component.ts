import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    standalone: true, 
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class BannerComponent {

}