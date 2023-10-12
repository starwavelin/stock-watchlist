import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8088/api/auth';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    register(username: string, email: string, password: string): Observable<any> {
        const body = { username, email, password };
        return this.http.post(`${AUTH_API}/register`, body, httpOptions);
    }

    login(username: string, password: string): Observable<any> {
        const body = { username, password };
        return this.http.post(`${AUTH_API}/login`, body, httpOptions);
    }

    logout(): Observable<any> {
        return this.http.post(`${AUTH_API}/logout`, {}, httpOptions);
    }
}
