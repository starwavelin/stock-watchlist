import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stock-watchlist',
    templateUrl: './stock-watchlist.component.html',
    styleUrls: ['./stock-watchlist.component.css']
})
export class StockWatchlistComponent {
    constructor(
        private authService: AuthService,
        private sessionService: SessionService,
        private router: Router
    ) {}

    saveAndLogout(): void {
        this.authService.logout().subscribe({
            next: (data) => {
                console.log(`Data received in the logging out process: ${data}`);
                this.sessionService.clear();
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.log(`logout erred: ${err}`);
            }
        });

        // window.location.reload();
    }
}
