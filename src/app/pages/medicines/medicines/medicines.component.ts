import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicines',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medicines.component.html',
})
export class MedicinesComponent {
  medicineForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.medicineForm = this.fb.group({
      name: ['', Validators.required],
      batchNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      company: ['', Validators.required],
    });
  }

  submitMedicine() {
    if (this.medicineForm.valid) {
      console.log('Submitted:', this.medicineForm.value);
      // TODO: Connect to backend service
      this.medicineForm.reset();
    }
  }
}
