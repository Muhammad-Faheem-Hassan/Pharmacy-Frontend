import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { MedicinesComponent } from './pages/medicines/medicines/medicines.component';
import { SalesComponent } from './pages/sales/sales/sales.component';
import { PurchasesComponent } from './pages/purchases/purchases/purchases.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'medicines', component: MedicinesComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'purchases', component: PurchasesComponent }
];
