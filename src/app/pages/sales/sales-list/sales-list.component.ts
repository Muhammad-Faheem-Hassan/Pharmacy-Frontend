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

  currentPage: number = 1;
  pageSize: number = 5; 

  constructor(private saleService: SaleService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.sales = await this.saleService.fetch();
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedSales();
  }

  updatePagedSales() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
  }
}
