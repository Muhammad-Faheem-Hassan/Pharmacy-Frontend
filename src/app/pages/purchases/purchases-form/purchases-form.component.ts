import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicineService } from '../../../core/services/medicine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../../core/services/supplier.service';
import { PurchaseService } from '../../../core/services/puchase.service';

@Component({
  selector: 'app-purchases-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchases-form.component.html',
})
export class PurchaseFormComponent {
  purchaseForm!: FormGroup;
  suppliers: any[] = [];
  medicines: any[] = [];
  mode: string | null = null;

  constructor(private fb: FormBuilder, private supplierService: SupplierService,
    private purchaseService: PurchaseService,
    private medicineService: MedicineService,
    private router: Router,
    private route: ActivatedRoute) {
    this.fetchMedicines();
    this.fetchSuppliers();
    this.purchaseForm = this.fb.group({
      supplierId: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      items: this.fb.array([]),
    });
    this.mode = this.route.snapshot.paramMap.get('mode');

    this.addItem();

  }

  get items(): FormArray {
    return this.purchaseForm.get('items') as FormArray;
  }

  onQuantityInput(index: number) {
    const quantityControl = this.items.at(index).get('quantity');

    quantityControl?.markAsTouched();
    quantityControl?.updateValueAndValidity();
  }

  addItem(): void {
    const group = this.fb.group({
      medicine: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      salePrice: [0],  // add this
    });

    group.get('medicine')?.valueChanges.subscribe(medId => {
      const med = this.medicines.find(m => m._id === medId);
      if (med && this.mode === "return") {
        group.get('quantity')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(med.quantity)
        ]);
        group.get('quantity')?.updateValueAndValidity();
      }
    });

    this.items.push(group);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  fetchMedicines(): void {
    this.medicineService.getItems().then(data => {
      this.medicines = data.data;
    });
  }

  get totalAmount(): number {
    return this.items.controls.reduce((sum, control) => {
      return sum + control.value.quantity * control.value.price;
    }, 0);
  }

  async fetchSuppliers(): Promise<void> {
    try {
      this.suppliers = await this.supplierService.getItems();
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {

    }
  }

  async submitPurchase() {
    if (this.purchaseForm.valid) {
      // if :mode have return then please add value type = "RETURN"

      const payload = {
        ...this.purchaseForm.value,
        totalAmount: this.totalAmount
      };
      if (this.mode === 'return') {
        payload.type = 'RETURN';
      } else {
        payload.type = 'PURCHASE';
      }
      await this.purchaseService.add(payload);
      this.purchaseForm.reset();
      this.items.clear();
      this.addItem();
      this.router.navigate(['/purchase']);
    }
  }

  isMedicineSelected(medId: string): boolean {
    return this.items.controls.some(ctrl => ctrl.get('medicine')?.value === medId);
  }

  getStock(index: number): number {
    const medicineId = this.items.at(index).get('medicine')?.value;
    const med = this.medicines.find(m => m._id === medicineId);
    return med ? med.quantity : 0;
  }

  getPrice(medicineId: string): number {
    const med = this.medicines.find(m => m._id === medicineId);
    return med ? med.price : 0;
  }
}
