import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplier-form.component.html',
})
export class SupplierFormComponent {
  supplierForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private supplierService: SupplierService) {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  async submitForm() {
    if (this.supplierForm.valid) {
      try {
        await this.supplierService.addItems(this.supplierForm.value);
        this.router.navigate(['/supplier']);
      } catch (error) {
        console.error('Failed to add supplier:', error);
      }
    }
  }
}
