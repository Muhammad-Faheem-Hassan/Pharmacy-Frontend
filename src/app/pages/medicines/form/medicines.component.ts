import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../../core/services/medicine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicines',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medicines.component.html',
})
export class MedicinesComponent {
  medicineForm: FormGroup;


  constructor(private fb: FormBuilder, private medicinesService: MedicineService, private router: Router) {

    this.medicineForm = this.fb.group({
      name: ['', Validators.required],
      batchNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  submitMedicine() {
    if (this.medicineForm.valid) {
      console.log('Submitted:', this.medicineForm.value);
      this.medicinesService.addItems(this.medicineForm.value)
      this.medicineForm.reset();
      this.router.navigate(['/medicines']);
    }
  }
}
