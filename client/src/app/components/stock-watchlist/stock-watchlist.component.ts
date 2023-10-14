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
    companiesSub!: Subscription;

    tickers: ITicker[] = [];
    tickersSub!: Subscription;

    priceSub!: Subscription;

    errorMessage: string = '';

    // For Search Bar
    selectableCompaneis: TickerCompany = {};
    searchTerm: string = '';
    filteredCompanies: string[] = [];

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

    filterCompanies(): void {
        if (!this.searchTerm) {
            this.filteredCompanies = [];
            return;
        }

        this.selectableCompaneis = this.getSelectableCompanies();
        const lowercaseSearchTerm = this.searchTerm.toLowerCase();

        // Filter to obtain options based on both ticker and company names
        this.filteredCompanies = Object.keys(this.selectableCompaneis).filter(
            (ticker) =>
                ticker.toLowerCase().includes(lowercaseSearchTerm) ||
                this.selectableCompaneis[ticker].toLowerCase().includes(lowercaseSearchTerm)
        );
    }

    async selectCompany(ticker: string) {
        this.priceSub = this.dataService.getPricesForUser(ticker).subscribe({
            next: (tickerPrice) => {
                const tickerObj = {
                    ticker: ticker,
                    company: this.allCompanies[ticker],
                    price: tickerPrice[ticker]
                };
                this.tickers.push(tickerObj);
            },
            error: (err) => {
                this.errorMessage = err;
            },
            complete: () => {
                this.priceSub.unsubscribe();
            }
        });

        // Clear the search term and dropdown
        this.searchTerm = '';
        this.filteredCompanies = [];
    }

    getSelectableCompanies(): TickerCompany {
        const selectableCompanies = { ...this.allCompanies };
        const keysToRemvoe = this.tickers.map((t) => t.ticker);
        keysToRemvoe.forEach((key) => {
            delete selectableCompanies[key];
        });
        return selectableCompanies;
    }

    saveAndLogout(): void {
        // Save the current tickers for the user
        this.tickersSub = this.dataService.postTickersForUser(this.tickers).subscribe({
            next: (obj) => {
                console.log(obj?.message);
            },
            error: (err) => {
                this.errorMessage = err;
            },
            complete: () => {
                // Logout
                this.router.navigate(['/logout']);
            }
        });
    }
}
