import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchases.component.html',
})
export class PurchaseComponent implements OnInit {
  purchaseForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      supplierName: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      items: this.fb.array([this.createItemGroup()]),
      totalAmount: [0],
    });
  }

  get items(): FormArray {
    return this.purchaseForm.get('items') as FormArray;
  }

  createItemGroup(): FormGroup {
    return this.fb.group({
      medicine: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  addItem(): void {
    this.items.push(this.createItemGroup());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
      this.updateTotal();
    }
  }

  updateTotal(): void {
    const total = this.items.controls.reduce((acc, curr) => {
      const quantity = curr.get('quantity')?.value || 0;
      const price = curr.get('price')?.value || 0;
      return acc + quantity * price;
    }, 0);

    this.purchaseForm.patchValue({ totalAmount: total });
  }

  submitPurchase(): void {
    if (this.purchaseForm.valid) {
      const purchaseData = this.purchaseForm.value;
      console.log('Purchase Submitted:', purchaseData);
      this.purchaseForm.reset();
      this.purchaseForm.setControl('items', this.fb.array([this.createItemGroup()]));
    }
  }
}
