import { Component, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { AddLocationComponent } from '../../dialogs/add-location/add-location.component';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent {
  displayedColumns: string[] = ['name', 'location'];
  locations: string[] = ['Okinawa', 'Japan', 'Guam']; // Example locations
  locationBases: { [location: string]: { name: string; units: string[] }[] } = {
    Okinawa: [
      { name: 'Kadena AB', units: ['123 Sq', '90 Sq'] },
      { name: 'Camp Foster', units: ['USNHO'] },
    ],
    Japan: [
      { name: 'Misawa AB', units: ['909 Sq'] },
      { name: 'Yokota AB', units: ['321 Sq', '77 Sw'] },
    ],
    Guam: [{ name: 'Andersen AFB', units: ['10 WG'] }],
  };

  bases: { name: string; location: string }[] = [];
  selectedLocation: string = '';
  selectedBase: string = '';
  newLocation: string = ''; // Input for new location
  baseName: string = '';
  unitName: string = ''; // New input field for unit name

  constructor(private cdr: ChangeDetectorRef) {}

  addBase() {
    if (this.baseName && this.selectedLocation) {
      // Add new base
      this.locationBases[this.selectedLocation] = [
        ...this.locationBases[this.selectedLocation],
        { name: this.baseName, units: [] },
      ];

      // Manually trigger change detection (optional, if needed)
      this.cdr.detectChanges();

      // Clear input fields
      this.baseName = '';
      this.selectedLocation = '';
    }
  }

  addUnit() {
    if (this.unitName && this.selectedBase) {
      const base = this.locationBases[this.selectedLocation].find(
        (b) => b.name === this.selectedBase
      );
      if (base) {
        base.units.push(this.unitName); // Add the unit to the base

        // Clear unit input field
        this.unitName = '';
      }
    }
  }

  // Add new location
  addLocation() {
    if (this.newLocation && !this.locations.includes(this.newLocation)) {
      this.locations = [...this.locations, this.newLocation]; // Create a new array reference
      this.locationBases[this.newLocation] = []; // Initialize an empty base array for the new location
      this.newLocation = ''; // Clear the input field
    }
  }

  // Get available bases for the selected location
  getBasesForLocation(): string[] {
    return (
      this.locationBases[this.selectedLocation]?.map((base) => base.name) || []
    );
  }

  // Get available units for the selected base
  getUnitsForBase(): string[] {
    const base = this.locationBases[this.selectedLocation]?.find(
      (b) => b.name === this.selectedBase
    );
    return base ? base.units : [];
  }
}
