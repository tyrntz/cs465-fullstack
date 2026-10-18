import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from './trip-data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripData
  ) {}

  // Retrieve saved JWT
  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  // Save JWT
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Remove JWT when logging out
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Check whether a valid, unexpired JWT exists
  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Retrieve current user information
  public getCurrentUser(): User {
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));

    return { email, name } as User;
  }

  // Login through Express API
  public login(user: User, passwd: string): Observable<AuthResponse> {
  return this.tripDataService.login(user, passwd).pipe(
    tap((response: AuthResponse) => {
      this.authResp = response;
      this.saveToken(response.token);
    })
  );
}

  // Register through Express API
  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value: AuthResponse) => {
        this.authResp = value;
        this.saveToken(value.token);
      },
      error: (error: any) => {
        console.error('Registration error:', error);
      }
    });
  }
}