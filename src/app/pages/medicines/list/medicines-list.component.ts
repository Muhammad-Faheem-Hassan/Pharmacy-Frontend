import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../../core/services/medicine.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medicines-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './medicines-list.component.html',
})
export class MedicinesListComponent implements OnInit {
  medicines: any[] = [];
  isLoading = true;

  constructor(private medicinesService: MedicineService) {}

  ngOnInit(): void {
    this.fetchMedicines();
  }

  async fetchMedicines(): Promise<void> {
    try {
      this.medicines = await this.medicinesService.getItems();
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
