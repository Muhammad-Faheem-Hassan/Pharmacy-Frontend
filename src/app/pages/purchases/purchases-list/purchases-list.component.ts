import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PurchaseService } from '../../../core/services/puchase.service';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    RouterLink],
  templateUrl: './purchases-list.component.html',
})
export class PurchaseListComponent implements OnInit {
  purchases: any[] = [];
  isLoading = true;

  totalRecord = 0;
  currentPage = 1;
  pageSize = 10;

  startDate: string = '';
  endDate: string = '';
  type: string = '';

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.fetchPurchases();
  }

  async fetchPurchases(): Promise<void> {
    try {
      const query: any = {
        l: this.pageSize,
        o: (this.currentPage - 1) * this.pageSize,
      };
      if (this.startDate) {
        query.startDate = this.startDate;
      }

      if (this.endDate) {
        query.endDate = this.endDate;
      }

      if (this.type) {
        query.type = this.type;
      }
      const res = await this.purchaseService.fetch(query);
      this.purchases = res.data;
      this.totalRecord = res.total;
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchPurchases();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.fetchPurchases();
  }
}
