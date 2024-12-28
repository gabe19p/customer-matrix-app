import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LocationsComponent } from './components/locations/locations.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'locations', component: LocationsComponent },
  { path: '', component: CustomersComponent },
];
