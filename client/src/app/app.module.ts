import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StockWatchlistComponent } from './components/stock-watchlist/stock-watchlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { httpInterceptorProviders } from './utils/http.interceptor';

@NgModule({
    declarations: [AppComponent, LoginComponent, RegisterComponent, StockWatchlistComponent, NavBarComponent],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, FormsModule],
    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {}
