import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageProcessingService } from '../image-processing.service';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs/operators';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {


  productDetails:product[]=[];

  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Description', 'Product Actual Price','Product Discounted Price','Images','Edit Product','Delete Product'];

  constructor(private productService:ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService:ImageProcessingService,
    private router:Router)
  {

  }

  ngOnInit():void
  {
    this.getAllProducts();
  }

  getAllProducts()
  {
    this.productService.getAllProducts()
    .pipe(map((x:product[],i)=>x.map((product:product)=>this.imageProcessingService.createImages(product))))
    .subscribe(
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

  showImages(product:product)
  {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent,
      {
        data:{
        images:product.productImages
        },
        height:'500px',
        width:'800px'
      });
  }

  editProductDetails(productId)
  {
    this.router.navigate(['/addNewProduct',{productId:productId}]);
  }

}
