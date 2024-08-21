import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { ProductService } from '../../services/product.service';
import { Sale } from '../../models/sale.model';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [FormsModule,CommonModule], 
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  sale: Sale = {
    productId: 0,
    quantitySold: 0,
    saleDate: new Date()
  };
  products: Product[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private salesService: SalesService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  recordSale(): void {
    this.salesService.recordSale(this.sale).subscribe({
      next: () => {
        this.successMessage = 'Sale recorded successfully!';
        this.errorMessage = '';
        this.resetForm();
      },
      error: err => {
        this.errorMessage = 'Error recording sale: ' + err.message;
        this.successMessage = '';
      }
    });
  }

  resetForm(): void {
    this.sale = {
      productId: 0,
      quantitySold: 0,
      saleDate: new Date()
    };
  }
}
