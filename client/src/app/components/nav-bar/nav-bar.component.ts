import { Component } from '@angular/core';
import { IUserProfile } from '../../interfaces/user-profile.interface';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    isLoggedIn: boolean = false;
    username: string = '';

    constructor(private sessionService: SessionService) {}

    ngOnInit(): void {
        this.sessionService.loginStatus$.subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;

            if (this.isLoggedIn) {
                const user: IUserProfile = this.sessionService.getUser();
                this.username = user.username;
            }
        });
    }
}
