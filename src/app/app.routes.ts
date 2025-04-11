import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { MedicinesComponent } from './pages/medicines/form/medicines.component';
import { SalesComponent } from './pages/sales/sales/sales.component';
import { PurchaseComponent } from './pages/purchases/purchases/purchases.component';
import { MedicinesListComponent } from './pages/medicines/list/medicines-list.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'medicines', component: MedicinesListComponent },
  { path: 'medicines/form', component: MedicinesComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'purchase', component: PurchaseComponent }
];
