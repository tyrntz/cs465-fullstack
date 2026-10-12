
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripList } from './trip-list/trip-list';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';

const routes: Routes = [
  { path: '', component: TripList },
  { path: 'add-trip', component: AddTrip },
  { path: 'edit-trip/:tripCode', component: EditTrip },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
