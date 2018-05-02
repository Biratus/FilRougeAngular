import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Product } from './product';
import { Response } from "@angular/http";

@Injectable()
export class ProductService {
  readonly rootUrl = 'http://localhost:8085';
  urlProducts='';

  constructor(private httpClient: HttpClient) { 
    this.httpClient=httpClient;
  }

  getProducts(): Observable<any>{
    return this.httpClient.get(this.urlProducts);
  }

  saveProduct(product:Product){ 
   // return this.http.post<Product>(this.urlProducts,product);
    return this.httpClient.post(this.rootUrl + '/Api/product', product);
  }

  removeProduct(product:Product) : Observable<any>{
    return this.httpClient.delete<Product>(this.urlProducts);
  }

  removeProductById(id:number) : Observable<any>{
    return this.httpClient.delete<Product>(this.urlProducts);
  }

  getProductById(id): Observable<any>{
    return this.httpClient.get(this.urlProducts).elementAt(id);
  }

  getProductByName(name): Observable<any>{
    return this.httpClient.get(this.urlProducts);
  }

  getProductByType(type): Observable<any>{
    return this.httpClient.get(this.urlProducts);
  }

  getProductByTag(tag): Observable<any>{
    return this.httpClient.get(this.urlProducts);
  }

  getProductByPrice(price): Observable<any>{
    return this.httpClient.get(this.urlProducts);
  }

  getProductByQty(qty): Observable<any>{
    return this.httpClient.get(this.urlProducts);
  }

  getProductBySrc(src): Observable<any>{
    return this.httpClient.get(this.urlProducts);
  }
}
