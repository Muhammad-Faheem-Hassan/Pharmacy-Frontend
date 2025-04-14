import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from '../../../core/services/sale.service'; // Update the path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  imports: [CommonModule],
  styleUrls: ['./sales-details.component.scss']
})
export class SalesDetailsComponent implements OnInit {
  saleId: string | null = null;
  sale: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService
  ) { }

  async ngOnInit () {
    this.saleId = this.route.snapshot.paramMap.get('id');
    if (this.saleId) {
      try {
        this.sale = await this.saleService.getById(this.saleId);
      } catch (err) {
        console.error('Failed to fetch sale details', err);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
