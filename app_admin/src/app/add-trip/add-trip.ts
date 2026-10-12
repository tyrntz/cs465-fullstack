
import { Component, ChangeDetectorRef } from '@angular/core';
import { Trip } from '../trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: false,
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
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
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    if (this.saving) return;

    this.saving = true;
    this.message = '';

    this.tripData.addTrip(this.trip).subscribe({
      next: () => {
        this.message = 'Trip added successfully!';
        this.saving = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error adding trip:', err);
        this.message = 'Error adding trip. Please try again.';
        this.saving = false;
        this.cdr.markForCheck();
      }
    });
  }
}
