import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { product } from './_model/product.model';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<product> {

  constructor(private productService:ProductService,
 private imageProcessingService:ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<product>{
    // logic to retrieve the product data, it could be a promise or observable
   // return this.productService.getProduct(route.paramMap.get('id'))

    const id=route.paramMap.get("productId");

    if(id)
    {
     return this.productService.getProductById(id)
     .pipe(map(p=>this.imageProcessingService.createImages(p)));
    }
    else
    {
      return of(this.getProductDetails());
    }
}

getProductDetails()
{
  return {
    productId:null,
    productName:"",
    productDescription:"",
    productActualPrice:0,
    productDiscountPrice:0,
    productImages:[]
  }
}

}
