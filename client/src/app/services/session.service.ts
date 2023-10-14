import { Injectable } from '@angular/core';
import { IUserProfile } from '../interfaces/user-profile.interface';
import { Observable, Subject } from 'rxjs';

/**
 * SessionService manages user information (username, email) inside Browser’s Session Storage.
 */

const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private loginStatusSubject = new Subject<boolean>();
    loginStatus$: Observable<boolean> = this.loginStatusSubject.asObservable(); // For the caller to use

    constructor() {}

    // Invoke this function when user logs in or logs out to make the Subject chagne
    emitLoginStatusChange(isLoggedIn: boolean) {
        this.loginStatusSubject.next(isLoggedIn);
    }

    saveUser(user: IUserProfile): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    getUser(): IUserProfile {
        const user = window.sessionStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : {};
    }

    isLoggedIn(): boolean {
        const user = window.sessionStorage.getItem(USER_KEY);
        return user ? true : false;
    }

    // When logout, call the clear()
    clear(): void {
        window.sessionStorage.clear();
    }
}
