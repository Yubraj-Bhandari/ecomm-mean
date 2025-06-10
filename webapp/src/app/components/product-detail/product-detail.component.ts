// import { Component, inject } from '@angular/core';
// import { CustomerService } from '../../services/customer.service';
// import { ActivatedRoute } from '@angular/router';
// import { Product } from '../../types/product';

// @Component({
//   selector: 'app-product-detail',
//   templateUrl: './product-detail.component.html'
// })
// export class ProductDetailComponent {
//   customerService=inject(CustomerService);
//   route=inject(ActivatedRoute);
//   product!:Product;
//   ngOnInit(){
// const id =this.route.snapshot.params["id"];
// this.customerService.getProductById(id).subscribe((result:any)=> {
//   this.product = result;
//   console.log(this.product);
// });
//   }

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from "../product-card/product-card.component";
import { WishlistCartService } from '../../services/wishlist-cart.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone:true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  imports: [MatButtonModule, ProductCardComponent,MatIconModule]
})
export class ProductDetailComponent {

 
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage: string = '';
newProducts: any;
similarProducts:Product[]=[];


  ngOnInit() {
    this.route.params.subscribe((result:any)=>{
      this.getProductDetail(result.id)
    });
  
  }
  getProductDetail(id:string){
  this.customerService.getProductById(id).subscribe((result: Product) => {
      this.product = result;
      this.mainImage = this.product.images[0] ;
    this.customerService.getProducts('', this.product.categoryId[0], '', '', '', 1, 4).subscribe(result => {
        this.similarProducts = result;
      })
    });
  }

  changeImage(url: string) {
    this.mainImage = url;
  }
  get sellingPrice(){
    return Math.round( this.product.price - (this.product.price * this.product.discount / 100));
  }

wishlistService=inject(WishlistCartService)
addToWishList(product:Product){
  console.log(product);
  if(this.isInWishList(product)){
    this.wishlistService.removeFromWishlists(product._id!).subscribe((result)=>{

    });
  }else{
    this.wishlistService.addInWishlists(product._id!).subscribe((result)=>{

    });
  }
}
isInWishList(product:Product){
let isExists = this.wishlistService.wishlists.find(result => result._id == product._id);
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
isProductInCart(productId:string){
  if(this.cartService.items.find(result => result.product._id == productId)) 
    {return true}
  else {return false}
}




}

