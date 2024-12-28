import { Component, OnInit, inject } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [MatTableModule, HttpClientModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent implements OnInit {
  locations: any[] = [];
  displayedColumns: string[] = ['name'];

  // Inject the service directly in the constructor
  locationsService = inject(LocationsService);

  ngOnInit(): void {
    this.locationsService.getLocations().subscribe((data: any[]) => {
      this.locations = data;
    });
  }
}
