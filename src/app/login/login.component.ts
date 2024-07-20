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
      console.log('Form Submitted', this.loginForm);
      if(this.loginForm.value.email === 'rai@gmail.com' && this.loginForm.value.password === '123456'){
        this.authService.login();
        this.router.navigate(['/tasks']);
      } else{
        alert('Invalid email or password');
      }
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
