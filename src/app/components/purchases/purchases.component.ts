import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../../services/purchases.service';
import { ProductService } from '../../services/product.service';
import { Purchase } from '../../models/purchase.model';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [FormsModule,CommonModule], 
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  purchase: Purchase = {
    productId: 0,
    quantityPurchased: 0,
    purchaseDate: new Date()
  };
  products: Product[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private purchasesService: PurchasesService,
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

  recordPurchase(): void {
    this.purchasesService.recordPurchase(this.purchase).subscribe({
      next: () => {
        this.successMessage = 'Purchase recorded successfully!';
        this.errorMessage = '';
        this.resetForm();
      },
      error: err => {
        this.errorMessage = 'Error recording purchase: ' + err.message;
        this.successMessage = '';
      }
    });
  }

  resetForm(): void {
    this.purchase = {
      productId: 0,
      quantityPurchased: 0,
      purchaseDate: new Date()
    };
  }
}
