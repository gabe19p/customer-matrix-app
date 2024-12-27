import { Injectable } from '@angular/core';
import { Customer, Unit } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customers: Customer[] = [];
  private units: Unit[] = [];

  constructor() {}

  // Get all customers
  getCustomers(): Customer[] {
    return this.customers;
  }

  // Add a new customer
  addCustomer(customer: Customer): void {
    this.customers.push(customer);
  }

  // Get all units
  getUnits(): Unit[] {
    return this.units;
  }

  // Add a new unit
  addUnit(unit: Unit): void {
    this.units.push(unit);
  }
}
