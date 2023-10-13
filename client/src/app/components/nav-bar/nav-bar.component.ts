import { Component } from '@angular/core';
import { IUserProfile } from '../../interfaces/user-profile.interface';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    isLoggedIn: boolean = false;
    username: string = '';

    constructor(
        private sessionService: SessionService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sessionService.loginStatus$.subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;

            if (this.isLoggedIn) {
                const user: IUserProfile = this.sessionService.getUser();
                this.username = user.username;
            }
        });
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
