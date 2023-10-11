export interface UserTickers {
    userId: number;
    tickers: Ticker[];
}

export interface Ticker {
    ticker: string;
    company: string;
    price: number;
}
