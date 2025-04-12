import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SupplierService } from '../../../core/services/supplier.service';
import { PurchaseService } from '../../../core/services/puchase.service';
import { MedicineService } from '../../../core/services/medicine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchases-form.component.html',
})
export class PurchaseFormComponent implements OnInit {
  purchaseForm!: FormGroup;
  suppliers: any[] = [];
  medicines: any[] = [];

  constructor(private fb: FormBuilder, private supplierService: SupplierService,
    private purchaseService: PurchaseService,
    private medicineService: MedicineService,
    private router: Router) { }


  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      supplierId: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      items: this.fb.array([this.createItemGroup()]),
      totalAmount: [0],
    });
    this.fetchSuppliers();
    this.fetchMedicine();
  }

  async fetchSuppliers(): Promise<void> {
    try {
      this.suppliers = await this.supplierService.getItems();
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {

    }
  }
  async fetchMedicine(): Promise<void> {
    try {
      this.medicines = await this.medicineService.getItems();
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {

    }
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

  async submitPurchase() {
    if (this.purchaseForm.valid) {
      const purchaseData = this.purchaseForm.value;
      console.log('Purchase Submitted:', purchaseData);
      await this.purchaseService.add(purchaseData)
      this.purchaseForm.reset();
      this.router.navigate(['/purchase']);
    }
  }
}
