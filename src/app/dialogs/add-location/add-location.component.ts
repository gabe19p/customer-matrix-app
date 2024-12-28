import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.scss',
})
export class AddLocationComponent {
  newLocation: string = '';

  constructor(public dialogRef: MatDialogRef<AddLocationComponent>) {}

  // Close the dialog and pass back the new location value
  onAddLocation(): void {
    if (this.newLocation.trim()) {
      this.dialogRef.close(this.newLocation);
    }
  }

  // Close the dialog without passing any data
  onCancel(): void {
    this.dialogRef.close();
  }
}
