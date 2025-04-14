import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports:[CommonModule],
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  totalItems: number = 100;  // Example, replace with your actual total items count
  pageSize: number = 10;     // Items per page
  currentPage: number = 1;
  totalPages: number = Math.ceil(this.totalItems / this.pageSize);

  pages: number[] = [];

  constructor() {
    this.generatePages();
  }

  // Generate the page numbers
  generatePages(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  // When a page is clicked
  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;

    this.currentPage = page;
    this.pageChange.emit(page);  // Emit the page change
  }
}
