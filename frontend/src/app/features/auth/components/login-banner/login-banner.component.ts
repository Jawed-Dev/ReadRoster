import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'app-login-banner',
    templateUrl: './login-banner.component.html',
    standalone: true, 
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class LoginBannerComponent {

}