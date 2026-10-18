import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private apiUrl = 'http://localhost:3000/api/trips';
  private authUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // Retrieve JWT authentication headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token') || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Retrieve all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  // Retrieve a specific trip
  getTrip(code: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/${code}`);
  }

  // Add a trip (authentication required)
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip, {
      headers: this.getAuthHeaders()
    });
  }

  // Update a trip (authentication required)
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiUrl}/${trip.code}`,
      trip,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  // Delete a trip (authentication required)
  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${code}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Login
  login(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.authUrl}/login`,
      {
        email: user.email,
        password: password
      }
    );
  }

  // Register
  register(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.authUrl}/register`,
      {
        name: user.name,
        email: user.email,
        password: password
      }
    );
  }
}