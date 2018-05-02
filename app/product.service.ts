import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Response } from "@angular/http";

@Injectable()
export class ProductService {

  urlAdminProducts='http://localhost:8080/formafond/Api/product/products';
  urlProducts='';

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getProducts(): Observable<any>{
    return this.http.get(this.urlAdminProducts);
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post<Product>(this.urlProducts, product);
  }

  removeProduct(product: Product): Observable<any> {
    return this.http.delete<Product>(this.urlProducts);
  }
  update(product: Product) {
    return this.http.put("http://localhost:8080/formafond/Api/product", product);
  }

  removeProductById(id: number): Observable<any> {
    return this.http.delete<Product>(this.urlProducts);
  }

  getProductById(id): Observable<any> {
    return this.http.get(this.urlProducts).elementAt(id);
  }

  getProductByName(name): Observable<any> {
    return this.http.get(this.urlProducts);
  }

  getProductByType(type): Observable<any> {
    return this.http.get(this.urlProducts);
  }

  getProductByTag(tag): Observable<any> {
    return this.http.get(this.urlProducts);
  }

  getProductByPrice(price): Observable<any> {
    return this.http.get(this.urlProducts);
  }

  getProductByQty(qty): Observable<any> {
    return this.http.get(this.urlProducts);
  }

  getProductBySrc(src): Observable<any> {
    return this.http.get(this.urlProducts);
  }

  search(name, category, page, resultByPage): Observable<any> {
    return this.http.get("http://localhost:8080/formafond/Api/product/search" + name + category + page + resultByPage);
  }

}
