import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../../core/services/medicine.service';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-medicines-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    RouterLink
  ],
  templateUrl: './medicines-list.component.html',
})
export class MedicinesListComponent implements OnInit {
  medicines: any[] = [];
  isLoading = true;

  totalRecord = 0;
  currentPage = 1;
  pageSize = 10;

  s: string = '';

  constructor(private medicinesService: MedicineService) {}

  ngOnInit(): void {
    this.fetchMedicines();
  }

  async fetchMedicines(): Promise<void> {
    const query: any = {
      l: this.pageSize,
      o: (this.currentPage - 1) * this.pageSize,
    };
    if (this.s) {
      query.s = this.s;
    }
    try {
      const response = await this.medicinesService.getItems(query);
      this.medicines = response.data;
      this.totalRecord = response.totalRecords;
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchMedicines();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.fetchMedicines();
  }
}
