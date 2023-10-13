import { Injectable } from '@angular/core';
import { IUserProfile } from '../interfaces/user-profile.interface';

/**
 * SessionService manages user information (username, email) inside Browser’s Session Storage.
 */

const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor() {}

    saveUser(user: IUserProfile): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    getUser(): any {
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
