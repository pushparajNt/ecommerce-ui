import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  public addProduct(product:FormData)
  {
      return this.httpClient.post<product>("http://localhost:9090/addNewProduct",product);
  }

  public getAllProducts()
  {
    return this.httpClient.get<product[]>("http://localhost:9090/getAllProducts");
  }

  public deleteProduct(productId:number)
  {
    console.log("printing product id inside service"+productId);
      return this.httpClient.delete("http://localhost:9090/deleteProductDetails/"+productId);
  }

}
