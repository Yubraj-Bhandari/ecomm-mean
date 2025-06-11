import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistCartService } from '../../services/wishlist-cart.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

@Input() product!:Product;
wishlistCartService=inject(WishlistCartService)



 get sellingPrice(){
    return Math.round( this.product.price - (this.product.price * this.product.discount / 100));
  }

addToWishList(product:Product){
  console.log(product);
  if(this.isInWishList(product)){
    this.wishlistCartService.removeFromWishlists(product._id!).subscribe((result)=>{
      this.wishlistCartService.init();
    });
  }else{
    this.wishlistCartService.addInWishlists(product._id!).subscribe((result)=>{
      this.wishlistCartService.init(); 
    });
  }
}
isInWishList(product:Product){
let isExists = this.wishlistCartService.wishlists.find(result => result._id == product._id);
if (isExists) return true;
else return false;
}
cartService=inject(CartService);
addToCart(product:Product){
  if(!this.isProductInCart(product._id!)){
    this.cartService.addToCart(product._id!,1).subscribe(()=>{
      this.cartService.init();
    })
    }else{
      this.cartService.removeFromCart(product._id!).subscribe(()=>{
        this.cartService.init();
      })
    }
}
// isProductInCart(productId:string){
//   if(this.cartService.items.find(result => result.product._id == productId)) 
//     {return true}
//   else {return false}
// }
isProductInCart(productId: string): boolean {
  if (!this.cartService.items) {
    return false; // Return false if items array is not initialized
  }
  return this.cartService.items.some(result => result?.product?._id === productId);
}

}
