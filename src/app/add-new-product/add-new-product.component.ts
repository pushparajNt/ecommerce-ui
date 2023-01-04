import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {


  constructor(private productService:ProductService)
  {

  }
  product:product={
    productName:"",
    productDescription:"",
    productActualPrice:0,
    productDiscountPrice:0
  }

  addProduct(productForm:NgForm)
  {
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe(
      (response:product)=>{
        console.log(response);
        productForm.reset();
      },
      (error:HttpErrorResponse)=>
      {
        console.log(error);
      }
    );
  }
  clearForm(productForm:NgForm)
  {
    productForm.reset();
  }

}