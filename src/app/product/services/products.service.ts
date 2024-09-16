import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private petition: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.petition.get<Product[]>(`/bp/products`);
  }

  getProductById(id: Product['id']): Observable<Product | undefined> {
    return this.petition
      .get<Product>(`/bp/products/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  createProduct(product: Product): Observable<Product> {
    return this.petition.post<Product>(`/bp/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.petition.put<Product>(`/bp/products/${product.id}`, product);
  }

  deleteProduct(id: Product['id']): Observable<any> {
    return this.petition.delete(`/bp/products/${id}`);
  }
}
