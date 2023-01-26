import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { product } from './_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<product> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<product>{
    // logic to retrieve the product data, it could be a promise or observable
   // return this.productService.getProduct(route.paramMap.get('id'))

    const id=route.paramMap.get("productId");

    if(id)
    {

    }
    else
    {
      return of(this.getProductDetails());
    }
}

getProductDetails()
{
  return {
    productName:"",
    productDescription:"",
    productActualPrice:0,
    productDiscountPrice:0,
    productImages:[]
  }
}

}
