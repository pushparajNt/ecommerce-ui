import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import { product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {


  constructor(private productService:ProductService,
    private sanitizer:DomSanitizer)
  {

  }
  product:product={
    productName:"",
    productDescription:"",
    productActualPrice:0,
    productDiscountPrice:0,
    productImages:[]
  }

  addProduct(productForm:NgForm)
  {

    const productFormData=this.prepareFormData(this.product);
    console.log(this.product);
    this.productService.addProduct(productFormData).subscribe(
      (response:product)=>{
        console.log(response);
        productForm.reset();
        this.product.productImages=[];
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

  onFileSelected(event)
  {
    console.log(event);
   if(event.target.files)
   {
    const uploadedFile=event.target.files[0];
    
    const fileHandle:FileHandle={
      file:uploadedFile,
      url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(uploadedFile))
    }

    this.product.productImages.push(fileHandle);
    console.log(this.product);

   }

  }

  prepareFormData(product:product):FormData
  {
    const formData=new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type:'application/json'})
    );
 

    for(var i=0;i<product.productImages.length;i++)
    {
      formData.append('imageFile',
      product.productImages[i].file,
      product.productImages[i].file.name);
    }
    
  return formData;
  }

  removeImage(i)
  {
    this.product.productImages.splice(i,1);
  }

  fileDropped(fileHandle:FileHandle)
   {
this.product.productImages.push(fileHandle);
   }

}