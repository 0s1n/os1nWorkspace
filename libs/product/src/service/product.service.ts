import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductEntity } from '../store/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProductsByCategory(categoryName: string) {
    return this.http.get<ProductEntity[]>(
      `https://fakestoreapi.com/products/category/${categoryName}`
    );
  }
}
