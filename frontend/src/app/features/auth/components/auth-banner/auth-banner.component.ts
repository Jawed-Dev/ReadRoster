import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'app-auth-banner',
    templateUrl: './auth-banner.component.html',
    standalone: true, 
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class AuthBannerComponent {

}