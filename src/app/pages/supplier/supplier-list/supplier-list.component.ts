import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './supplier-list.component.html',
})
export class SupplierListComponent implements OnInit {
  suppliers: any[] = [];
  isLoading = true;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.fetchSuppliers();
  }

  async fetchSuppliers(): Promise<void> {
    try {
      this.suppliers = await this.supplierService.getItems();
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
