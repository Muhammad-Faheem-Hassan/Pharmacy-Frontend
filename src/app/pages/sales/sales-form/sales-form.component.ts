import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicineService } from '../../../core/services/medicine.service';
import { SaleService } from '../../../core/services/sale.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-form.component.html',
})
export class SaleFormComponent {
  saleForm: FormGroup;
  medicines: any[] = [];
  mode: string | null = null;

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private saleService: SaleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.saleForm = this.fb.group({
      customer: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      items: this.fb.array([]),
    });
    this.mode = this.route.snapshot.paramMap.get('mode');

    this.addItem(); // Add at least one row
    this.fetchMedicines();
  }

  get items(): FormArray {
    return this.saleForm.get('items') as FormArray;
  }

  // addItem(): void {
  //   this.items.push(
  //     this.fb.group({
  //       medicine: ['', Validators.required],
  //       quantity: [1, [Validators.required, Validators.min(1)]],
  //       price: [0, [Validators.required, Validators.min(0)]],
  //     })
  //   );
  // }

  onQuantityInput(index: number) {
    const quantityControl = this.items.at(index).get('quantity');
    console.log(quantityControl);

    quantityControl?.markAsTouched();
    quantityControl?.updateValueAndValidity();
  }

  addItem(): void {
    const group = this.fb.group({
      medicine: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      salePrice: [0, [Validators.required, Validators.min(0)]],  // add this
    });
  
    group.get('medicine')?.valueChanges.subscribe(medId => {
      const med = this.medicines.find(m => m._id === medId);
      if (med) {
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
      // if :mode have return then please add value type = "RETURN"

      const payload = {
        ...this.saleForm.value,
        totalAmount: this.totalAmount
      };
      if (this.mode === 'return') {
        payload.type = 'RETURN';
      } else {
        payload.type = 'SALE';
      }
      await this.saleService.add(payload);
      this.saleForm.reset();
      this.items.clear();
      this.addItem();
      this.router.navigate(['/sale']);
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
