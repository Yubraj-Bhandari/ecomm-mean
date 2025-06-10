import {inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http: HttpClient;
  constructor() {
    this.http = inject(HttpClient);
  }

  // getAllProducts() {
  //   return this.http.get<Product[]>(environment.apiUrl + '/product');
  // }
  getAllProducts(categoryId?: string) {
  const url = categoryId 
    ? `${environment.apiUrl}/product?categoryId=${categoryId}` 
    : `${environment.apiUrl}/product`;
  return this.http.get<Product[]>(url);
}

  getProductById(id: string) {
    return this.http.get<Product>(environment.apiUrl + '/product/' + id);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(environment.apiUrl + '/product', product);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put<Product>(environment.apiUrl + '/product/' + id, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(environment.apiUrl + '/product/' + id);
  }
  
}