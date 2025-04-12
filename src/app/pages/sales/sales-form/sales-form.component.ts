import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicineService } from '../../../core/services/medicine.service';
import { SaleService } from '../../../core/services/sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-form.component.html',
})
export class SaleFormComponent {
  saleForm: FormGroup;
  medicines: any[] = [];

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private saleService: SaleService,
    private router: Router
  ) {
    this.saleForm = this.fb.group({
      customer: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      items: this.fb.array([]),
    });

    this.addItem(); // Add at least one row
    this.fetchMedicines();
  }

  get items(): FormArray {
    return this.saleForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(
      this.fb.group({
        medicine: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        price: [0, [Validators.required, Validators.min(0)]],
      })
    );
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  fetchMedicines(): void {
    this.medicineService.getItems().then(data => {
      this.medicines = data;
    });
  }

  get totalAmount(): number {
    return this.items.controls.reduce((sum, control) => {
      return sum + control.value.quantity * control.value.price;
    }, 0);
  }

  async submitSale() {
    if (this.saleForm.valid) {
      const payload = {
        ...this.saleForm.value,
        totalAmount: this.totalAmount
      };
      await this.saleService.add(payload);
      this.saleForm.reset();
      this.items.clear();
      this.addItem();
      this.router.navigate(['/sale']);
    }
  }
}
