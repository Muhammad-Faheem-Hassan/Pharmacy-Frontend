import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  saleForm!: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.saleForm = this.fb.group({
      customerName: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      items: this.fb.array([]),
    });
    this.addItem(); 
  };

  get items(): FormArray {
    return this.saleForm.get('items') as FormArray;
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.updateTotal();
  }

  updateTotal(): void {
    const total = this.items.controls.reduce((acc, item) => {
      const qty = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      return acc + qty * price;
    }, 0);
    this.saleForm.get('totalAmount')?.setValue(total);
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      medicine: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });

    this.items.push(itemGroup);
    this.updateTotal();
  }

  submitSale(): void {
    if (this.saleForm.valid) {
      const saleData = this.saleForm.getRawValue();
      console.log('Sale Submitted:', saleData);
      this.saleForm.reset();
    }
  }
}
