import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@features/auth/auth.service";

@Component({
    selector:'app-header',
    templateUrl:'./app.header.html',
})

export class AppHeaderComponent {

    constructor(private authService: AuthService, private router: Router) { }

    onLogout(): void {
        this.authService.logout().subscribe({
          next: () => {
            this.router.navigate(['/connexion']);
          },
          error: () => {
          }
        });
      } 
}