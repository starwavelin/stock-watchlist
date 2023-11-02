import { Component } from '@angular/core';
import { IUserProfile } from '../../interfaces/user-profile.interface';
import { SessionService } from '../../services/session.service';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    isLoggedIn: boolean = false;
    username: string = '';
    loginStatusSub!: Subscription;
    LOGIN_STATUS_REFRESH_INTERVAL: number = 1000; // 1 second

    constructor(private sessionService: SessionService) {}

    ngOnInit(): void {
        // Listen to isLoggedIn status change when a user clicks login or logout button
        this.sessionService.loginStatus$.subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
            this._showUsername();
        });
        /**
         * If I just coded the way above, it would Not be able to get the right
         * loginStatus if a user clicks the refresh button from the browser.
         * Therefore, I deceided to check the loginStatus every 1 second to handle
         * the case when a user clicks the refresh button from his browser.
         */
        this.loginStatusSub = interval(this.LOGIN_STATUS_REFRESH_INTERVAL).subscribe(() => {
            this.isLoggedIn = this.sessionService.isLoggedIn();
            this._showUsername();
        });
    }

    private _showUsername() {
        if (this.isLoggedIn) {
            const user: IUserProfile = this.sessionService.getUser();
            this.username = user.username;
        }
    }

    ngOnDestroy(): void {
        this.loginStatusSub.unsubscribe();
    }
}
