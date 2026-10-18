import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('app_admin');

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  // Check whether the administrator is logged in
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Log out and return to the login page
  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}