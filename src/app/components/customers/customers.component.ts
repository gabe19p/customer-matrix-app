import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { customers } from '../../data/customers.mock';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  providers: [DatePipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'role',
    'email',
    'number',
    'movingDate',
    'lastContactDate',
  ];
  customerData = new MatTableDataSource(customers); // Use MatTableDataSource for pagination and filtering

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    // You can leave this empty or use it for other initializations
  }

  // This method will run after the view is initialized
  ngAfterViewInit(): void {
    // Initialize the paginator
    this.customerData.paginator = this.paginator;
  }

  // Method to handle the filter input
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerData.filter = filterValue.trim().toLowerCase();
  }
}
