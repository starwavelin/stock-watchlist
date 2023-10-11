import mongoose from 'mongoose';

const tickerSchema = new mongoose.Schema({
    ticker: String,
    company: String,
    price: Number
});

const userTickerSchema = new mongoose.Schema({
    userId: Number,
    tickers: [tickerSchema]
});

export const UserTicker = mongoose.model('UserTicker', userTickerSchema);
