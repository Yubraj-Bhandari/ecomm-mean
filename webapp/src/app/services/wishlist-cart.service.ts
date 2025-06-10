import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistCartService {
  find(arg0: (result: any) => boolean) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  http=inject(HttpClient);
  wishlists:Product[]=[];
  init(){
   return this.getWishlists().subscribe(result=>{
      this.wishlists=result;
    });
  }
  getWishlists() {
    return this.http.get<Product[]>(environment.apiUrl+`/customer/wishlists`);
  }
addInWishlists(productId:string) {
    return this.http.post(environment.apiUrl+`/customer/wishlists/`+productId,{});
  }
removeFromWishlists(productId:string) {
    return this.http.delete(environment.apiUrl+`/customer/wishlists/`+productId,{});
  }



}
