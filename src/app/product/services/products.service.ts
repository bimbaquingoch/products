import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import { environment } from '../../../env/environments';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private baseUrl = environment.baseUrls;
  constructor(private petition: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.petition.get<Product[]>(`/bp/products`);
  }

  deleteProduct(id: Product['id']): Observable<any> {
    return this.petition.delete(`/bp/products/${id}`);
  }
}
