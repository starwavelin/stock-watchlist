import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './logout.component.html'
})
export class LogoutComponent {
    constructor(
        private authService: AuthService,
        private sessionService: SessionService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.logout();
    }

    logout(): void {
        this.authService.logout().subscribe({
            next: (data) => {
                console.log(`Data received in the logging out process: ${JSON.stringify(data)}`);
                this.sessionService.clear();
                this.sessionService.emitLoginStatusChange(false);
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.log(`logout erred: ${err}`);
            }
        });
    }
}
