import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Response } from "@angular/http";

@Injectable()
export class ProductService {

  urlAdminProducts='http://localhost:8082/formafond';
  urlProducts='http://localhost:8082/formafond/Api/product';

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getProducts(): Observable<any>{
    return this.http.get(this.urlProducts+"/products");
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(this.urlProducts, product);
  }

  update(product: Product) {
    return this.http.post(this.urlProducts, product);
  }

  removeProductById(id: number): Observable<any> {
    return this.http.delete<Product>(this.urlProducts+"/"+id);
  }

  getProductById(id): Observable<any> {
    return this.http.get(this.urlProducts).elementAt(id);
  }

  search(name, category, page, resultByPage): Observable<any> {
    return this.http.get(this.urlProducts+"/search?"+ 
    "name="+name+ 
    "&category="+category+ 
    "&page="+page+
    "&resultByPage="+resultByPage);
  }

  getCategories(): Observable<any> {
    return this.http.get(this.urlProducts +"/categories");
  }

}
