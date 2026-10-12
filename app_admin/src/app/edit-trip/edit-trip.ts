
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: false,
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  message = '';
  saving = false;

  constructor(
    private tripData: TripData,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('tripCode');

    if (code) {
      this.tripData.getTrip(code).subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.trip = data[0];
            this.trip.start = this.trip.start.substring(0, 10);
          } else {
            this.message = 'Trip not found.';
          }
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error loading trip:', err);
          this.message = 'Unable to load trip.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  onSubmit(): void {
    if (this.saving) return;

    this.saving = true;
    this.message = '';

    this.tripData.updateTrip(this.trip).subscribe({
      next: () => {
        this.saving = false;
        this.message = 'Trip updated successfully!';
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error updating trip:', err);
        this.saving = false;
        this.message = 'Error updating trip.';
        this.cdr.markForCheck();
      }
    });
  }
}
