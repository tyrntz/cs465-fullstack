import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: false,
  styleUrl: './login.css',
  templateUrl: './login.html'
})
export class Login {

  public credentials = {
    email: '',
    password: ''
  };

  public errorMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public onLoginSubmit(): void {
    this.errorMessage = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    const user = new User();
    user.email = this.credentials.email;

    this.authenticationService.login(user, this.credentials.password)
      .subscribe({
        next: () => {
          // Redirect to the trip list after successful login
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      });
  }
}