import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { WishlistCartService } from '../../services/wishlist-cart.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule,ProductCardComponent,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


customerService=inject(CustomerService);
newProduct:Product[]=[];
featuredProduct:Product[]=[];
product: any;
bannerImages:Product[]=[];
wishlistService=inject(WishlistCartService);
cartService=inject(CartService);



ngOnInit(){
  this.customerService.getFeaturedProducts().subscribe((result)=>{
    this.featuredProduct=result;
    console.log(this.featuredProduct);
    this.bannerImages.push(...result);
    console.log('Featured Products:', this.featuredProduct);
  });
  this.customerService.getNewProducts().subscribe((result: Product[])=>{
this.newProduct=result;
this.bannerImages.push(...result);
console.log('New Products:', this.newProduct);
  });
  
}

}
