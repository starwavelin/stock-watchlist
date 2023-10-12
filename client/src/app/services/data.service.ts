import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITicker } from '../interfaces/ticker.interface';
import { TickerCompany } from '../interfaces/ticker-company.type';
import { IPrice } from '../interfaces/price.type';

const COMPANIES_URL = 'http://localhost:8088/api/companies'; // Get all available ticker-company names, for the user search purpose
const TICKERS_URL = 'http://localhost:8088/api/users/tickers'; // Load and Post tickers for a user
const PRICES_URL = 'http://localhost:8088/api/users/tickers'; // Get the prices of the current tickers a user has, for the price refresh purpose

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) {}

    getCompanies(): Observable<TickerCompany> {
        return this.http.get(COMPANIES_URL) as Observable<TickerCompany>;
    }

    getTickersForUser(): Observable<ITicker[]> {
        return this.http.get(TICKERS_URL) as Observable<Array<ITicker>>;
    }

    postTickersForUser(tickers: ITicker[]): Observable<any> {
        return this.http.post(TICKERS_URL, tickers);
    }

    getPricesForUser(tickersStr: string): Observable<IPrice> {
        return this.http.get(`${PRICES_URL}?tickers=${tickersStr}`) as Observable<IPrice>;
    }
}
