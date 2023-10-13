import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { TickerCompany } from '../../interfaces/ticker-company.type';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { ITicker } from '../../interfaces/ticker.interface';

@Component({
    selector: 'app-stock-watchlist',
    templateUrl: './stock-watchlist.component.html',
    styleUrls: ['./stock-watchlist.component.css']
})
export class StockWatchlistComponent {
    pageTitle = 'Stock Watchlist';
    allCompanies: TickerCompany = {};
    selectableCompanies: TickerCompany = {};
    companiesSub!: Subscription;

    tickers: ITicker[] = [];
    tickersSub!: Subscription;

    errorMessage: string = '';

    constructor(
        private authService: AuthService,
        private sessionService: SessionService,
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.companiesSub = this.dataService.getCompanies().subscribe({
            next: (companies) => {
                this.allCompanies = companies;
            },
            error: (err) => {
                this.errorMessage = err;
            },
            complete: () => {}
        });

        this.tickersSub = this.dataService.getTickersForUser().subscribe({
            next: (tickers) => {
                this.tickers = tickers;
            },
            error: (err) => {
                this.errorMessage = err;
            },
            complete: () => {}
        });
    }

    ngOnDestroy() {
        this.companiesSub.unsubscribe();
        this.tickersSub.unsubscribe();
    }

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
    }
}
