import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from '../../../core/services/sale.service'; // Update the path as needed
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../../../core/services/puchase.service';

@Component({
  selector: 'app-purchases-details',
  templateUrl: './purchases-details.component.html',
  imports: [CommonModule],
  styleUrls: ['./purchases-details.component.scss']
})
export class PurchasesDetailsComponent implements OnInit {
  saleId: string | null = null;
  sale: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private purchcaseService: PurchaseService
  ) { }

  async ngOnInit () {
    this.saleId = this.route.snapshot.paramMap.get('id');
    if (this.saleId) {
      try {
        this.sale = await this.purchcaseService.getById(this.saleId);
      } catch (err) {
        console.error('Failed to fetch sale details', err);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
