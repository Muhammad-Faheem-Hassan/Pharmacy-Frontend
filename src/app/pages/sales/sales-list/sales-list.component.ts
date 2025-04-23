import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleService } from '../../../core/services/sale.service';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    RouterLink
  ],

  templateUrl: './sales-list.component.html',
})
export class SaleListComponent implements OnInit {
  sales: any[] = [];
  isLoading = true;

  totalRecord = 0;
  currentPage = 1;
  pageSize = 10;

  startDate: string = '';
  endDate: string = '';
  type: string = '';

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.fetchSales();
  }

  async fetchSales(): Promise<void> {
    this.isLoading = true;
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

    try {
      const res = await this.saleService.fetch(query);
      this.sales = res.data;
      this.totalRecord = res.totalRecord;
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchSales();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.fetchSales();
  }
}
