import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onFormSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm);
      const { username, email, password } = this.signupForm.value;
      this.userService.registerUser(email, password, username).subscribe(
        response => {
          if (response.error) {
            alert(response.message);
          } else {
            alert('Registration Successful');
            this.navigateToLogin();
          }
        }
      );
    }
  }


  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
