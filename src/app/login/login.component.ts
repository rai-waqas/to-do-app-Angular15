import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onFormSubmit(): void {
        if (this.loginForm.valid) {
            console.log('Form Submitted', this.loginForm.value);

            const { email, password } = this.loginForm.value;
            this.authService.login(email, password).subscribe(
                response => {
                    console.log('Login successful', response);
                    localStorage.setItem('access token', response.token);
                    this.authService.setUser(response.user);
                    console.log(this.authService.getUser());
                    this.authService.isLoggedIn.next(true);
                    this.authService.setUserId(response.user.id);
                    console.log('Is logged in?', this.authService.isLoggedIn.value);
                    this.router.navigate(['/tasks']);
                },
                error => {
                    console.error('Login failed', error);
                    alert('Invalid email or password');
                }
            );
        }
    }

    navigateToSignup(): void {
        this.router.navigate(['/signup']);
    }
}
