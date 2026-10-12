
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Trip } from '../trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-list',
  standalone: false,
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripList implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripData: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripData.getTrips().subscribe({
      next: (data) => {
        console.log('Trips received:', data);
        this.trips = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading trips:', err);
      }
    });
  }
}
