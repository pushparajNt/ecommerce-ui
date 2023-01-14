import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {


  productDetails:product[]=[];

  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Description', 'Product Actual Price','Product Discounted Price','Delete Product'];

  constructor(private productService:ProductService)
  {

  }

  ngOnInit():void
  {
    this.getAllProducts();
  }

  getAllProducts()
  {
    this.productService.getAllProducts().subscribe(
      (response:product[])=>{
        console.log(response);
        this.productDetails=response;
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
      );
  }

  deleteProductDetails(productId)
  {
    console.log("printing element");
    console.log(productId);

    this.productService.deleteProduct(productId).subscribe(
      (response)=>{
        console.log(response);
        this.getAllProducts();

      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

}
