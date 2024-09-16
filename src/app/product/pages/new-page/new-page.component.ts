import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { ProductService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css',
})
export class NewPageComponent implements OnInit {
  public productForm = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    logo: new FormControl('', { nonNullable: true }),
    date_release: new FormControl(new Date(), { nonNullable: true }),
    date_revision: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.productService.getProductById(id)))
      .subscribe((product: any) => {
        if (!product) return this.router.navigate(['/product/list']);

        this.productForm.reset(product);
        return;
      });
  }

  get currentProduct(): Product {
    const product = this.productForm.value as any;
    return product;
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    // if (this.productForm.value.id) {
    //   this.productService.updateProduct(this.currentProduct).subscribe(() => {
    //     // this.productForm.reset();
    //     this.router.navigate(['/product/list']);
    //   });
    //   return;
    // }

    this.productService.createProduct(this.currentProduct).subscribe(() => {
      // this.productForm.reset();
      this.router.navigate(['/product/list']);
    });
  }
}
