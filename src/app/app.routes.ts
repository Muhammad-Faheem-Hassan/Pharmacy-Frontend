import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { MedicinesComponent } from './pages/medicines/form/medicines.component';
import { PurchaseFormComponent } from './pages/purchases/purchases-form/purchases-form.component';
import { MedicinesListComponent } from './pages/medicines/list/medicines-list.component';
import { SupplierListComponent } from './pages/supplier/supplier-list/supplier-list.component';
import { SupplierFormComponent } from './pages/supplier/supplier-form/supplier-form.component';
import { PurchaseListComponent } from './pages/purchases/purchases-list/purchases-list.component';
import { SaleListComponent } from './pages/sales/sales-list/sales-list.component';
import { SaleFormComponent } from './pages/sales/sales-form/sales-form.component';
import { SalesDetailsComponent } from './pages/sales/sales-details/sales-details.component';
import { PurchasesDetailsComponent } from './pages/purchases/purchases-details/purchases-details.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  { path: 'medicines', component: MedicinesListComponent },
  { path: 'medicines/form', component: MedicinesComponent },

  { path: 'sale', component: SaleListComponent },
  { path: 'sale/form', component: SaleFormComponent },
  { path: 'sale/form/:mode', component: SaleFormComponent },
  { path: 'sale/details/:id', component: SalesDetailsComponent },
  
  { path: 'purchase', component: PurchaseListComponent },
  { path: 'purchase/form', component: PurchaseFormComponent },
  { path: 'purchase/form/:mode', component: PurchaseFormComponent },
  { path: 'purchase/details/:id', component: PurchasesDetailsComponent },

  { path: 'supplier', component: SupplierListComponent },
  { path: 'supplier/form', component: SupplierFormComponent },
];
