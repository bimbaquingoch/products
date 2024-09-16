import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit {
  public products: Product[] = [];
  public displayedProducts: Product[] = []; // Lista de productos que se muestra
  public itemsPerPage: number = 5;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((items: any) => {
      this.products = items.data;
      this.updateDisplayedProducts();
    });
  }

  showPaginationByValue(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.itemsPerPage = +value;
    this.updateDisplayedProducts();
  }

  private updateDisplayedProducts(): void {
    this.displayedProducts = this.products.slice(0, this.itemsPerPage);
  }

  searchById(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.productService.getProductById(value).subscribe((product) => {
      if (product) {
        this.products = [product];
        this.updateDisplayedProducts();
      }
    });
  }

  deleteProduct(id: Product['id']): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(
        (product: Product) => product.id !== id
      );
      this.updateDisplayedProducts();
    });
  }
}
