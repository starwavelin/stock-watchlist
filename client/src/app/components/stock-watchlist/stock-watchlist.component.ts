import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TickerCompany } from '../../interfaces/ticker-company.type';
import { Subscription, filter, interval, switchMap } from 'rxjs';
import { DataService } from '../../services/data.service';
import { ITicker } from '../../interfaces/ticker.interface';
import { IPrice } from '../../interfaces/price.type';

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

    priceSub!: Subscription; // Used when adding a new stock, to get the price of this new stock
    priceRefreshSub!: Subscription; // Used for refreshing the prices of all the current stocks
    PRICE_REFRESH_INTERVAL: number = 5 * 1000; // 5 seconds

    errorMessage: string = '';

    // For Search Bar
    selectableCompaneis: TickerCompany = {};
    searchTerm: string = '';
    filteredCompanies: string[] = [];

    constructor(
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.companiesSub = this.dataService.getCompanies().subscribe({
            next: (companies: TickerCompany) => {
                this.allCompanies = companies;
            },
            error: (err) => {
                this.errorMessage = err;
            },
            complete: () => {}
        });

        this.tickersSub = this.dataService.getTickersForUser().subscribe({
            next: (tickers: ITicker[]) => {
                this.tickers = tickers.sort((t1, t2) => {
                    if (t1.ticker < t2.ticker) return -1;
                    else if (t1.ticker > t2.ticker) return 1;
                    return 0;
                });
            },
            error: (err) => {
                this.errorMessage = err;
            },
            complete: () => {}
        });

        // Price Refresh Logic
        this.priceRefreshSub = interval(this.PRICE_REFRESH_INTERVAL)
            .pipe(
                filter(() => {
                    return this.tickers.length > 0 && this.isMarketOpen();
                }),
                switchMap(() => {
                    const tickersStr = this.tickers.map((t) => t.ticker).join(',');
                    return this.dataService.getPricesForUser(tickersStr);
                })
            )
            .subscribe((updatedTickerPrices: IPrice) => this.updateTickers(updatedTickerPrices));
    }

    isMarketOpen(): boolean {
        const now = new Date();
        const currHour = now.getUTCHours();
        // Market is open from 9:30am to 4pm in ET, which translates to 14:30 - 21:00 UTC (Regular) and 13:30-20:00 UTC (Eastern in Daylight saving)
        // So for simplicity, I consider 13:30 - 21:00 UTC
        return currHour >= 13 && currHour <= 21;
    }

    updateTickers(newTickerPrices: IPrice) {
        this.tickers.forEach((t) => {
            t.price = newTickerPrices[t.ticker];
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
            next: (tickerPrice: IPrice) => {
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

    deleteTicker(index: number) {
        this.tickers.splice(index, 1);
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
