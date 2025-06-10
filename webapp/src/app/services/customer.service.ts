// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
// import { Product } from '../types/product';
// import { Category } from '../types/category';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerService {
//   getNewProduct() {
//     throw new Error('Method not implemented.');
//   }
//   http = inject(HttpClient);

//   constructor() {}

//   getNewProducts() {
//     return this.http.get<Product[]>(environment.apiUrl + "/customer/new-products");
//   }

//    getFeaturedProducts() {
//     return this.http.get<Product[]>(environment.apiUrl + "/customer/featured-products");
//   }

//    getCategories() {
//     return this.http.get<Category[]>(environment.apiUrl + "/customer/categories");
//   }
//   getProducts(searchTerm:string,categoryId:string,sortBy:string,sortOrder:string,brandId:string,page:number,pageSize:number) {
//     return this.http.get<Product[]>(environment.apiUrl + `/customer/products?searchTerm= ${searchTerm}&categoryId= ${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}&page=${page}&pageSize=${pageSize}`);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';
import { Category } from '../types/category';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  constructor() {}

  getNewProducts() {
    return this.http.get<Product[]>(environment.apiUrl + "/customer/new-products");
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(environment.apiUrl + "/customer/featured-products");
  }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + "/customer/categories");
  }

   getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + "/customer/brands");
  }

  getProducts(searchTerm: string, categoryId: string, sortBy: string, sortOrder: string, brandId: string, page: number, pageSize: number) {
    let url = `${environment.apiUrl}/product/listing?page=${page}&pageSize=${pageSize}`;
    if (searchTerm) url += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    if (categoryId) url += `&categoryId=${categoryId}`;
    if (sortBy) url += `&sortBy=${sortBy}`;
    if (sortOrder) url += `&sortOrder=${sortOrder}`;
    if (brandId) url += `&brandId=${brandId}`;
  return this.http.get<Product[]>(url);
  }
  getProductById(id: string) {
  return this.http.get<Product>(environment.apiUrl
    +"/customer/product/"+id);
}
getWishList(){
  return this.http.get<Product[]>(environment.apiUrl
    +"/customer/wishlists");
}

}
