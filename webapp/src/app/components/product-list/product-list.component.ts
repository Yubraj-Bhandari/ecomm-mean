// import { Component, inject, OnInit } from '@angular/core';
import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent,MatSelectModule,FormsModule,MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);

  searchTerm: string = "";
  categoryId: string = "";
  sortBy: string = "";
  sortOrder: string = "";
  brandId: string = "";
  page = 1;
  pagesize = 6;
  products: Product[] = [];

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.searchTerm = params['search'] || '';
  //     this.categoryId = params['categoryId'] || '';
  //     this.getProdcuts();
  //   });
  // }

  category:Category[]=[];
  brands:Brand[]=[];
ngOnInit(): void {
  this.customerService.getCategories().subscribe(result=>{
    this.category=result;
  })
   this.customerService.getBrands().subscribe(result=>{
    this.brands=result;
  })

  this.route.queryParams.subscribe(params => {
     this.searchTerm = params['search'] || '';
    this.categoryId = params['categoryId'] || '';
  this.getProdcuts();
  });
}

  

//   getProdcuts(): void {
//     interface GetProductsResult {
//       // Adjust fields as per actual result structure
//       // Example: products: Product[];
//       // For now, assuming result is Product[]
//     }

//     this.customerService
//       .getProducts(
//       this.searchTerm,
//       this.categoryId,
//       this.sortBy,
//       this.sortOrder,
//       this.brandId,
//       this.page,
//       this.pagesize
//       )
//       .subscribe((result: Product[]) => {
//       this.products = result;
//       });
//   }
// }
getProdcuts(): void {
setTimeout(() => {
  this.customerService
    .getProducts(this.searchTerm, this.categoryId, this.sortBy, this.sortOrder, this.brandId, this.page, this.pagesize)
    .subscribe(result => {
    this.products = result;
    if(result.length<this.pagesize){
      this.isNext=false;

    }
    });
},500);
  
}
orderChange(event:any){
this.sortBy='price',
this.sortOrder=event;
this.getProdcuts();
}
isNext=true;
pageChange(page:number){
this.page=page;
this.isNext=true;
this.getProdcuts();
}


}