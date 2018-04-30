import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Product } from './product';

@Injectable()
export class ProductService {

  urlProducts='';

  constructor(private  http:HttpClient) { 
    this.http=http;
  }

  getProducts(): Observable<any>{
    return this.http.get(this.urlProducts);
  }

  saveProduct(product:Product): Observable<any>{
    return this.http.post<Product>(this.urlProducts,product);
  }

  removeProduct(product:Product) : Observable<any>{
    return this.http.delete<Product>(this.urlProducts);
  }

  removeProductById(id:number) : Observable<any>{
    return this.http.delete<Product>(this.urlProducts);
  }

  getProductById(id): Observable<any>{
    return this.http.get(this.urlProducts).elementAt(id);
  }

  getProductByName(name): Observable<any>{
    return this.http.get(this.urlProducts);
  }

  getProductByType(type): Observable<any>{
    return this.http.get(this.urlProducts);
  }

  getProductByTag(tag): Observable<any>{
    return this.http.get(this.urlProducts);
  }

  getProductByPrice(price): Observable<any>{
    return this.http.get(this.urlProducts);
  }

  getProductByQty(qty): Observable<any>{
    return this.http.get(this.urlProducts);
  }

  getProductBySrc(src): Observable<any>{
    return this.http.get(this.urlProducts);
  }
}