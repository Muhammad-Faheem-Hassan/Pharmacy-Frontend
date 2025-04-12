import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleService } from '../../../core/services/sale.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sales-list.component.html',
})
export class SaleListComponent implements OnInit {
  sales: any[] = [];
  isLoading = true;

  constructor(private saleService: SaleService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.sales = await this.saleService.fetch();
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
