import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule, CommonModule,MatSelectModule,MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
formBuilder=inject(FormBuilder);
productForm = this.formBuilder.group({
  name: [null,[Validators.required, Validators.minLength(3)]],
  shortDescription: [null,[Validators.required, Validators.minLength(10)]],
  description: [null,[Validators.required, Validators.minLength(20)]],
  price: [null,[Validators.required, Validators.min(0)]],
  discount: [null,[Validators.required, Validators.min(0)]],
  categoryId: [null,[Validators.required]],
  brandId: [null,[Validators.required]],
  images:this.formBuilder.array([]),
  isFeatured:[false],
  isNewProduct:[false]
});

categoryservice=inject(CategoryService);
brandservice=inject(BrandService);
productService=inject(ProductService);
brands:Brand[]=[];
categories:Category[]=[];
id!:string;
route=inject(ActivatedRoute);

ngOnInit(){
 
  this.categoryservice.getCategories().subscribe((result:Category[])=>{
    this.categories=result;
  })
  this.brandservice.getBrands().subscribe((result:Brand[])=>{
    this.brands=result;
  });
  this.id=this.route.snapshot.params['id'];
  console.log(this.id);
  if(this.id){
this.productService.getProductById(this.id).subscribe((result:Product)=>{
  for(let index=0; index<result.images.length; index++){
    this.addImage();
  }
  
  this.productForm.patchValue(result as any);
})
  }else{
 this.addImage();
  }
}

router=inject(Router);
addProduct() {
  let value=this.productForm.value;
  console.log(value);
  this.productService.addProduct(value as any).subscribe((result:any)=>{
    alert("Product Added Successfully");
    this.router.navigateByUrl('/admin/products');
  })

}
updateProduct() {
  let value=this.productForm.value;
  console.log(value);
  this.productService.updateProduct(this.id,value as any).subscribe((result:any)=>{
    alert("Product Updated Successfully");
    this.router.navigateByUrl('/admin/products');
  })
}

addImage(){
  this.images.push(this.formBuilder.control(null))
}
removeImage(){
  this.images.removeAt(this.images.controls.length - 1);
}

get images(){
  return this.productForm.get('images') as FormArray;
}
}