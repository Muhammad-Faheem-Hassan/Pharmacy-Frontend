import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PurchaseService } from '../../../core/services/puchase.service';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './purchases-list.component.html',
})
export class PurchaseListComponent implements OnInit {
  purchases: any[] = [];
  isLoading = true;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.fetchPurchases();
  }

  async fetchPurchases(): Promise<void> {
    try {
      this.purchases = await this.purchaseService.fetch();
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
