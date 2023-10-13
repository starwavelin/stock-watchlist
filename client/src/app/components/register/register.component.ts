import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    regForm: FormGroup;
    isOnSubmit: boolean = false;
    isRegSuccessful: boolean = false;
    isRegFailed: boolean = false;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.regForm = this.fb.group({
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    ngOnInit(): void {}

    onSubmit(): void {
        this.isOnSubmit = true;
        const username = this.regForm.get('username')?.value;
        const email = this.regForm.get('email')?.value;
        const password = this.regForm.get('password')?.value;

        this.authService.register(username, email, password).subscribe({
            next: (data) => {
                console.log(data);
                this.isRegSuccessful = true;
                this.isRegFailed = false;
            },
            error: (err) => {
                this.errorMessage = err.error.message;
                this.isRegFailed = true;
            }
        });
    }
}
