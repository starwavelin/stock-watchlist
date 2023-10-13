import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { IUserProfile } from '../../interfaces/user-profile.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    isOnSubmit: boolean = false;
    isLoggedIn: boolean = false;
    isLoginFailed: boolean = false;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private sessionService: SessionService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    ngOnInit(): void {
        // Check if the user has logged in
        if (this.sessionService.isLoggedIn()) {
            this.isLoggedIn = true;
        }
    }

    // Call authService login() method
    onSubmit(): void {
        this.isOnSubmit = true;
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        if (this.loginForm.valid) {
            this.authService.login(username, password).subscribe({
                next: (data: IUserProfile) => {
                    // Successfully logged in
                    this.sessionService.saveUser(data);
                    this.isLoggedIn = true;
                    this.isLoginFailed = false;
                    this.router.navigate(['/watchlist']);
                },
                error: (err) => {
                    this.errorMessage = err.error.message;
                    this.isLoginFailed = true;
                }
            });
        }
    }
}
