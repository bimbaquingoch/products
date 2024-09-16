import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(5)],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-ZñÑ ]+$'),
      ],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
        Validators.pattern('^[a-zA-ZñÑ ]+$'),
      ],
    }),
    logo: new FormControl('visa', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date_release: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date_revision: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
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

    if (this.productForm.value.id) {
      this.productService.updateProduct(this.currentProduct).subscribe(() => {
        this.router.navigate(['/product/list']);
      });
      return;
    }

    this.productService.createProduct(this.currentProduct).subscribe(() => {
      this.router.navigate(['/product/list']);
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.productForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  resetForm(): void {
    this.productForm.reset();
  }
}
